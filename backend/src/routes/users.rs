use crate::handlers;
use actix_web::web;

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(handlers::list_users_handler))
        .route("", web::post().to(handlers::post_user_handler))
        .route("/{id}", web::get().to(handlers::get_user_handler))
        .route("/{id}", web::put().to(handlers::put_user_handler))
        .route("/{id}", web::delete().to(handlers::delete_user_handler));
}
