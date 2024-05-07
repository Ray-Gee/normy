use actix_web::{App, HttpServer};
use dotenv::dotenv;
use env_logger::init;
use log::info;
use std::env;

mod auth;
mod config;
mod db;
mod email;
mod handlers;
mod models;
mod routes;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "debug");
    }
    init();
    let server =
        HttpServer::new(|| App::new().configure(routes::handle_config)).bind("0.0.0.0:8080")?;

    info!("サーバーが起動しました。ポート 8080 で待機中...");
    server.run().await
}
