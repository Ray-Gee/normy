use crate::handlers;
use actix_cors::Cors;
use actix_web::web;
use log::info;

pub fn handle_config(cfg: &mut web::ServiceConfig) {
    info!("Configuring routes and CORS");
    let cors = Cors::default()
        .allowed_origin("http://localhost:3000")
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
        .allowed_headers(vec![
            actix_web::http::header::AUTHORIZATION,
            actix_web::http::header::ACCEPT,
        ])
        .allowed_header(actix_web::http::header::CONTENT_TYPE)
        .max_age(3600);

    cfg.service(
        web::scope("/api/rust")
            .wrap(cors)
            .service(
                web::resource("/users")
                    .route(web::get().to(handlers::list_users_handler))
                    .route(web::post().to(handlers::post_user_handler)),
            )
            .service(
                web::resource("/users/{id}")
                    .route(web::get().to(handlers::get_user_handler))
                    .route(web::put().to(handlers::put_user_handler))
                    .route(web::delete().to(handlers::delete_user_handler)),
            ),
    );
}
