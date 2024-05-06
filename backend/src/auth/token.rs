use rand::{distributions::Alphanumeric, Rng};
// use serde_json::json;
use crate::config::constants;
// use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use log::debug;
use serde::{Deserialize, Serialize};
use std::env;

pub fn generate_confirmation_link(user_id: &str) -> String {
    let token: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(30)
        .map(char::from)
        .collect();

    let base_url = env::var("BASE_URL").unwrap_or("https://yourdomain.com".to_string());
    debug!("base_url: {:?}", base_url);
    debug!("token: {:?}", token);
    debug!("user_id: {:?}", user_id);
    format!("{}/confirm?token={}&user_id={}", base_url, token, user_id)
}

// pub fn generate_message(user_name: &str, company_name: &str, confirmation_link: &str) -> String {
//     constants::generate_message(user_name, company_name, confirmation_link)
// }

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

// fn create_token(id: &str) -> Result<String, jsonwebtoken::errors::Error> {
//     let expiration = chrono::Utc::now()
//         .checked_add_signed(chrono::Duration::seconds(60 * 60))
//         .expect("valid timestamp")
//         .timestamp();
//     let claims = Claims {
//         sub: id.to_owned(),
//         exp: expiration as usize,
//     };
//     debug!("claims: {:?}", claims);
//     encode(
//         &Header::default(),
//         &claims,
//         &EncodingKey::from_secret("secret".as_ref()),
//     )
// }

// fn decode_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
//     decode::<Claims>(
//         token,
//         &DecodingKey::from_secret("secret".as_ref()),
//         &Validation::new(Algorithm::HS256),
//     )
//     .map(|data| data.claims)
// }
