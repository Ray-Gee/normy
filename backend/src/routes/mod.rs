use crate::handlers;
use actix_web::web;
use log::info;
mod configure;
mod users;
use crate::middleware::auth::Auth;

pub fn handle_config(cfg: &mut web::ServiceConfig) {
    info!("Configuring routes and CORS");
    let cors = configure::configure_cors();
    cfg.service(
        web::scope("/api/rust")
            // .wrap(Auth)
            .wrap(cors)
            .service(web::resource("/confirm").route(web::post().to(handlers::post_auth_confirm)))
            .service(web::resource("/login").route(web::post().to(handlers::login_handler)))
            .service(web::scope("/users").configure(users::routes)),
    );
}
