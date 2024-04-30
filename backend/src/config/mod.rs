pub mod constants;
use dotenv::dotenv;
use lazy_static::lazy_static;
use std::env;

lazy_static! {
    pub static ref DB_URL: String = {
        dotenv().ok();
        format!(
            "postgres://{}:{}@db:5432/{}",
            env::var("POSTGRES_USER").expect("POSTGRES_USER must be set"),
            env::var("POSTGRES_PASSWORD").expect("POSTGRES_PASSWORD must be set"),
            env::var("POSTGRES_DB").expect("POSTGRES_DB must be set")
        )
    };
}
