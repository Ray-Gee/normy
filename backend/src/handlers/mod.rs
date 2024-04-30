use crate::config;
use crate::db::{
    create_user, delete_user, fetch_all_users, fetch_user, fetch_user_by_id, update_user,
};
use crate::models::User;
use actix_web::{web, HttpResponse, Responder};
use log::{debug, error, info};
use std::future::Future;
use tokio_postgres::{tls::NoTlsStream, Client, Connection, Error, NoTls, Socket};
use uuid::Uuid;

pub async fn post_user_handler(user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        match create_user(&client, &user.into_inner()).await {
            Ok(user_id) => match fetch_user(&client, user_id).await {
                Ok(user) => HttpResponse::Ok().json(user),
                Err(_) => {
                    HttpResponse::InternalServerError().body("Failed to retrieve created user")
                }
            },
            Err(_) => HttpResponse::InternalServerError().body("Internal error"),
        }
    })
    .await
}

pub async fn get_user_handler(user_id: web::Path<Uuid>) -> impl Responder {
    with_db_connection(|client| async move {
        match fetch_user_by_id(&client, *user_id).await {
            Ok(user) => HttpResponse::Ok().json(user),
            Err(_) => HttpResponse::NotFound().body("User not found"),
        }
    })
    .await
}

pub async fn list_users_handler() -> impl Responder {
    info!("list_users 中身");
    with_db_connection(|client| async move {
        match fetch_all_users(&client).await {
            Ok(users) => HttpResponse::Ok().json(users),
            Err(_) => HttpResponse::InternalServerError().body("Internal error"),
        }
    })
    .await
}

pub async fn put_user_handler(user_id: web::Path<Uuid>, user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        match update_user(&client, &user.into_inner(), *user_id).await {
            Ok(_) => HttpResponse::Ok().body("User updated"),
            Err(_) => HttpResponse::InternalServerError().body("Internal error"),
        }
    })
    .await
}

pub async fn delete_user_handler(user_id: web::Path<Uuid>) -> impl Responder {
    with_db_connection(|client| async move {
        match delete_user(&client, *user_id).await {
            Ok(rows_affected) => {
                if rows_affected == 0 {
                    HttpResponse::NotFound().body("User not found")
                } else {
                    HttpResponse::Ok().body("User deleted")
                }
            }
            Err(_) => HttpResponse::InternalServerError().body("Internal error"),
        }
    })
    .await
}

async fn handle_connection_error(e: Error) -> HttpResponse {
    error!("Failed to connect to database: {}", e);
    HttpResponse::InternalServerError().body("Database connection failed")
}

pub async fn establish_connection() -> Result<(Client, Connection<Socket, NoTlsStream>), Error> {
    debug!("Establishing connection with string: {}", &*config::DB_URL);
    tokio_postgres::connect(&*config::DB_URL, NoTls).await
}

async fn with_db_connection<F, Fut>(f: F) -> impl Responder
where
    F: FnOnce(Client) -> Fut,
    Fut: Future<Output = HttpResponse>,
{
    let connection_result = establish_connection().await;
    match connection_result {
        Ok((client, connection)) => {
            actix_web::rt::spawn(async move {
                if let Err(e) = connection.await {
                    error!("Connection error: {}", e);
                }
            });
            f(client).await
        }
        Err(e) => handle_connection_error(e).await,
    }
}
