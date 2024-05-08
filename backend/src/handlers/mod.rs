use crate::db::{
    connections::with_db_connection, create_and_fetch_user, delete_user, fetch_all_users,
    fetch_token_is_valid, fetch_user_by_id, update_user,
};
use crate::email;
use crate::types::{ApiResponse, AuthConfirmParams, User};
use actix_web::{web, HttpResponse, Responder};
use log::{error, info};
use serde_json::json;
use uuid::Uuid;

pub async fn post_user_handler(user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        match create_and_fetch_user(&client, &user).await {
            Ok(created_user) => {
                match email::client::send_confirmation_email(&client, &created_user).await {
                    Ok(_) => HttpResponse::Ok().json(created_user),
                    Err(e) => {
                        error!("Failed to send confirmation email: {}", e);
                        HttpResponse::InternalServerError().json(json!({
                            "error": "Failed to send confirmation email"
                        }))
                    }
                }
            }
            Err(response) => {
                error!("Failed to create or fetch user: {:?}", response);
                response
            }
        }
    })
    .await
}

pub async fn get_user_handler(user_id: web::Path<Uuid>) -> impl Responder {
    with_db_connection(|client| async move {
        match fetch_user_by_id(&client, *user_id).await {
            Ok(user) => HttpResponse::Ok().json(user),
            Err(e) => {
                error!("Failed in get_user_handler: {:?}", e);
                HttpResponse::NotFound().body("User not found")
            }
        }
    })
    .await
}

pub async fn list_users_handler() -> impl Responder {
    info!("list_users 中身");
    with_db_connection(|client| async move {
        match fetch_all_users(&client).await {
            Ok(users) => HttpResponse::Ok().json(users),
            Err(e) => {
                error!("Failed in list_users_handler: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error")
            }
        }
    })
    .await
}

pub async fn put_user_handler(user_id: web::Path<Uuid>, user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        match update_user(&client, &user.into_inner(), *user_id).await {
            Ok(_) => HttpResponse::Ok().body("User updated"),
            Err(e) => {
                error!("Failed in put_user_handler: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error")
            }
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
            Err(e) => {
                error!("Failed in delete_user_handler: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error")
            }
        }
    })
    .await
}

pub async fn post_auth_confirm(params: web::Json<AuthConfirmParams>) -> impl Responder {
    info!(
        "Received: token = {}, user_id = {}",
        params.token, params.user_id
    );
    with_db_connection(|client| async move {
        match fetch_token_is_valid(&client, &params.token, &params.user_id).await {
            Ok(true) => {
                info!("Authentication successful");
                let response = ApiResponse {
                    status: String::from("success"),
                    message: String::from("Authentication successful"),
                };
                HttpResponse::Ok().json(response)
            }
            Ok(false) => {
                info!("Authentication failed");
                let response = ApiResponse {
                    status: String::from("error"),
                    message: String::from("Authentication failed"),
                };
                HttpResponse::BadRequest().json(response)
            }
            Err(e) => {
                error!("Error occurred in fetch_token_is_valid: {:?}", e);
                HttpResponse::InternalServerError().json("Internal server error")
            }
        }
    })
    .await
}
