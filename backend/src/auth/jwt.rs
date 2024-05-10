use std::env;

use jsonwebtoken::{decode, errors::Error, DecodingKey, Validation};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

pub fn create_jwt(id: &str) -> String {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::days(90))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: id.to_owned(),
        exp: expiration as usize,
    };
    let header = Header::default();
    encode(
        &header,
        &claims,
        &EncodingKey::from_secret("secret".as_ref()),
    )
    .unwrap()
}

pub fn validate_jwt(token: &str) -> Result<Claims, Error> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(env::var("SECRET_KEY").expect("Expected").as_ref()),
        &Validation::default(),
    )
    .map(|data| data.claims)
}
