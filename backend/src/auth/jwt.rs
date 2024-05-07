use jsonwebtoken::{encode, EncodingKey, Header};
use serde::Serialize;

#[derive(Serialize)]
struct Claims {
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
