use crate::db::connections::with_db_connection;
use crate::db::{
    create_user, delete_user, fetch_all_users, fetch_user, fetch_user_by_id, update_user,
};
use crate::email;
use crate::models::User;
use actix_web::{web, HttpResponse, Responder};
use log::{info, error};
use uuid::Uuid;

pub async fn post_user_handler(user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        match email::client::send_email(&user.email.as_str(), "test", "test body").await {
            Ok(_) => info!("Sent successfully!"),
            Err(e) => error!("Failed to send: {:?}", e),
        };

        match create_user(&client, &user.into_inner()).await {
            Ok(user_id) => {
                info!("User created with ID: {}", user_id);
                match fetch_user(&client, user_id).await {
                    Ok(user) => HttpResponse::Ok().json(user),
                    Err(e) => {
                        error!("Failed to retrieve user: {:?}", e);
                        HttpResponse::InternalServerError().body("Failed to retrieve created user")
                    }
                }
            }
            Err(e) => {
                error!("Failed to create user: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error during user creation")
            }
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
