use crate::auth::jwt;
use crate::db::{
    authenticate_user, create_and_fetch_user, delete_token, delete_user, fetch_all_users,
    fetch_token_is_valid, fetch_user_by_id, update_activated_at, update_user,
};
use crate::email;
use crate::types::{ApiResponse, AuthConfirmParams, JwtResponse, LoginParams, User};
use actix_web::{web, HttpResponse, Responder};
use deadpool_postgres::Pool;
use log::{error, info};
use serde_json::json;
use uuid::Uuid;

pub async fn post_user_handler(pool: web::Data<Pool>, user: web::Json<User>) -> impl Responder {
    match pool.get().await {
        Ok(client) => match create_and_fetch_user(&client, &user).await {
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
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn get_user_handler(pool: web::Data<Pool>, user_id: web::Path<Uuid>) -> impl Responder {
    match pool.get().await {
        Ok(client) => match fetch_user_by_id(&client, *user_id).await {
            Ok(user) => HttpResponse::Ok().json(user),
            Err(e) => {
                error!("Failed in get_user_handler: {:?}", e);
                HttpResponse::NotFound().body("User not found")
            }
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn list_users_handler(pool: web::Data<Pool>) -> impl Responder {
    info!("list_users 中身");
    match pool.get().await {
        Ok(client) => match fetch_all_users(&client).await {
            Ok(users) => HttpResponse::Ok().json(users),
            Err(e) => {
                error!("Failed in list_users_handler: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error")
            }
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn put_user_handler(
    pool: web::Data<Pool>,
    user_id: web::Path<Uuid>,
    user: web::Json<User>,
) -> impl Responder {
    match pool.get().await {
        Ok(client) => match update_user(&client, &user.into_inner(), *user_id).await {
            Ok(_) => {
                match fetch_user_by_id(&client, *user_id).await {
                    Ok(user) => {
                        let jwt = jwt::create_jwt(&user);
                        let base_response = ApiResponse {
                            message: String::from("Update successful"),
                        };
                        let response = JwtResponse {
                            base: base_response,
                            jwt,
                        };
                        HttpResponse::Ok().json(response)
                    },
                    Err(e) => {
                        error!("Failed in fetch_user_by_id: {:?}", e);
                        HttpResponse::InternalServerError().body("Internal error")
                    }
                }
            },
            Err(e) => {
                error!("Failed in put_user_handler: {:?}", e);
                HttpResponse::InternalServerError().body("Internal error")
            }
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn delete_user_handler(
    pool: web::Data<Pool>,
    user_id: web::Path<Uuid>,
) -> impl Responder {
    match pool.get().await {
        Ok(client) => match delete_user(&client, *user_id).await {
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
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn post_auth_confirm(
    pool: web::Data<Pool>,
    params: web::Json<AuthConfirmParams>,
) -> impl Responder {
    info!(
        "Received: token = {}, user_id = {}",
        params.token, params.user_id
    );
    match pool.get().await {
        Ok(client) => match fetch_token_is_valid(&client, &params.token, &params.user_id).await {
            Ok(true) => {
                info!("Authentication successful");
                match delete_token(&client, &params.token).await {
                    Ok(_) => {
                        update_activated_at(&client, &params.user_id).await.unwrap();
                        let response = ApiResponse {
                            message: String::from("Authentication successful"),
                        };
                        HttpResponse::Ok().json(response)
                    }
                    Err(e) => {
                        error!("Error occurred in delete_token: {:?}", e);
                        HttpResponse::InternalServerError().json("Internal server error")
                    }
                }
            }
            Ok(false) => {
                info!("Authentication failed");
                let response = ApiResponse {
                    message: String::from("Authentication failed"),
                };
                HttpResponse::BadRequest().json(response)
            }
            Err(e) => {
                error!("Error occurred in fetch_token_is_valid: {:?}", e);
                HttpResponse::InternalServerError().json("Internal server error")
            }
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}

pub async fn login_handler(
    pool: web::Data<Pool>,
    params: web::Json<LoginParams>,
) -> impl Responder {
    info!("login_handler内: {:?}", params);
    match pool.get().await {
        Ok(client) => match authenticate_user(&client, &params.email, &params.password).await {
            Ok(Some(user)) => {
                info!("Login successful for user: {:?}", user);

                let jwt = jwt::create_jwt(&user);

                let base_response = ApiResponse {
                    message: String::from("Login successful"),
                };
                let response = JwtResponse {
                    base: base_response,
                    jwt,
                };

                HttpResponse::Ok().json(response)
            }
            Ok(None) => {
                error!("Authentication failed for user: {}", params.email);
                HttpResponse::Unauthorized().body("Authentication failed")
            }
            Err(e) => {
                error!("Failed to authenticate user: {:?}", e);
                HttpResponse::InternalServerError().body("Internal Server Error")
            }
        },
        Err(e) => {
            error!("Failed to get DB connection from pool: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to get DB connection")
        }
    }
}
