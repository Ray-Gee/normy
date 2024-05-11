use std::env;

use jsonwebtoken::{decode, errors::Error, DecodingKey, Validation};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::types::User;
use crate::types::domain::email::Email;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: Uuid,
    name: String,
    email: Email,
    exp: usize,
}

pub fn create_jwt(user: &User) -> String {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::days(90))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: user.id.expect("Expected Uuid"),
        name: user.name.clone(),
        email: user.email.clone(),
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
