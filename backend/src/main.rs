mod routes;
mod handlers;
mod db;
mod models;
mod config;
use std::env;
use std::net::TcpListener;
use log::info;

fn main() {
    env::set_var("RUST_LOG", "debug");
    env_logger::init();

    let listener = TcpListener::bind("0.0.0.0:8080").unwrap();
    info!("Server: {:?}", listener);

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                routes::handle_client(stream);
            }
            Err(e) => {
                eprintln!("Unable to handle incoming connection: {}", e);
            }
        }
    }
}