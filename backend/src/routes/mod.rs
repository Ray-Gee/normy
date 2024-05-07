use crate::handlers;
use actix_web::web;
use log::info;
mod users;
mod configure;

pub fn handle_config(cfg: &mut web::ServiceConfig) {
    info!("Configuring routes and CORS");
    let cors = configure::configure_cors();
    cfg.service(
        web::scope("/api/rust")
            .wrap(cors)
            .service(web::resource("/confirm").route(web::post().to(handlers::post_auth_confirm)))
            .service(web::scope("/users").configure(users::routes)),
    );
}
