use dotenv::dotenv;
use env_logger::init;
use std::env;

pub fn setup_environment() {
    dotenv().ok();
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "debug");
    }
    init();
}
