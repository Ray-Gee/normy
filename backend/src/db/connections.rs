use crate::config;
use actix_web::{HttpResponse, Responder};
use log::{debug, error};
use std::future::Future;
use tokio_postgres::{tls::NoTlsStream, Client, Connection, Error, NoTls, Socket};

async fn handle_connection_error(e: Error) -> HttpResponse {
    error!("Failed to connect to database: {}", e);
    HttpResponse::InternalServerError().body("Database connection failed")
}

async fn establish_connection() -> Result<(Client, Connection<Socket, NoTlsStream>), Error> {
    debug!("Establishing connection with: {}", &*config::DB_URL);
    tokio_postgres::connect(&*config::DB_URL, NoTls).await
}

pub async fn with_db_connection<F, Fut>(f: F) -> impl Responder
where
    F: FnOnce(Client) -> Fut,
    Fut: Future<Output = HttpResponse>,
{
    let connection_result = establish_connection().await;
    match connection_result {
        Ok((client, connection)) => {
            actix_web::rt::spawn(async move {
                if let Err(e) = connection.await {
                    error!("Connection error: {}", e);
                }
            });
            f(client).await
        }
        Err(e) => handle_connection_error(e).await,
    }
}
