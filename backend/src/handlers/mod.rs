use crate::db::{
    connections::with_db_connection, create_and_fetch_user, delete_user, fetch_all_users,
    fetch_user_by_id, update_user,
};
use crate::email;
use crate::models::User;
use actix_web::{web, HttpResponse, Responder};
use log::{error, info};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub async fn post_user_handler(user: web::Json<User>) -> impl Responder {
    with_db_connection(|client| async move {
        let user = user.into_inner();
        match create_and_fetch_user(&client, &user).await {
            Ok(created_user) => {
                if let Err(_) = email::client::send_confirmation_email(&created_user).await {
                    return HttpResponse::InternalServerError()
                        .body("Failed to send confirmation email");
                }
                HttpResponse::Ok().json(created_user)
            }
            Err(response) => response,
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

#[derive(Deserialize, Debug)]
pub struct AuthConfirmParams {
    user_id: String,
    token: String,
}

#[derive(Serialize)]
struct ApiResponse {
    status: &'static str,
    message: &'static str,
}

async fn verify_credentials(_token: &str, _user_id: &str) -> bool {
    // ここでデータベースを呼び出し、トークンとユーザーIDが一致するか確認します
    // 以下は仮のコードです
    // 実際には、データベースへの問い合わせやトークンの検証ロジックを実装する必要があります
    true // 仮の返り値
}

pub async fn post_auth_confirm(params: web::Json<AuthConfirmParams>) -> impl Responder {
    info!(
        "Received: token = {}, user_id = {}",
        params.token, params.user_id
    );

    if verify_credentials(&params.token, &params.user_id).await {
        let response = ApiResponse {
            status: "success",
            message: "Authentication successful",
        };
        HttpResponse::Ok().json(response)
    } else {
        let response = ApiResponse {
            status: "error",
            message: "Authentication failed",
        };
        HttpResponse::BadRequest().json(response)
    }
}
