use rand::{distributions::Alphanumeric, Rng};
// use serde_json::json;
use crate::config::constants;
// use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use log::debug;
use serde::{Deserialize, Serialize};
use std::env;

pub fn generate_confirmation_token() -> String {
    rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(30)
        .map(char::from)
        .collect()
}

pub fn generate_confirmation_link(user_id: &str, token: &str) -> String {
    let base_url = env::var("BASE_URL").unwrap_or_else(|_| "https://yourdomain.com".to_string());
    format!("{}/confirm?token={}&user_id={}", base_url, token, user_id)
}

// fn decode_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
//     decode::<Claims>(
//         token,
//         &DecodingKey::from_secret("secret".as_ref()),
//         &Validation::new(Algorithm::HS256),
//     )
//     .map(|data| data.claims)
// }
