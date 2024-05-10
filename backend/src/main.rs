use actix_web::{web, App, HttpServer};
use log::info;

mod auth;
mod config;
mod db;
mod email;
mod handlers;
mod middleware;
mod routes;
mod types;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = config::setup::setup_environment();

    let server = HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::handle_config)
    })
    .bind("0.0.0.0:8080")
    .expect("サーバーのバインドに失敗しました");

    info!("サーバーが起動しました。ポート 8080 で待機中...");
    server.run().await
}
