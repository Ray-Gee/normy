use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use dotenv::dotenv;
use env_logger::init;
use postgres::NoTls;
use std::env;

pub fn setup_environment() -> Pool {
    dotenv().ok();
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "debug");
    }
    init();

    let mut cfg = Config::new();
    cfg.dbname = Some(env::var("POSTGRES_DB").unwrap().to_string());
    cfg.host = Some("localhost".to_string());
    cfg.user = Some(env::var("POSTGRES_USER").unwrap().to_string());
    cfg.password = Some(env::var("POSTGRES_PASSWORD").unwrap().to_string());
    cfg.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });

    cfg.create_pool(Some(Runtime::Tokio1), NoTls)
        .expect("Failed to create pool.")
}
