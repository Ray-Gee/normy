use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize, Debug)]
pub struct AuthConfirmParams {
    pub user_id: Uuid,
    pub token: String,
}

#[derive(Deserialize, Debug)]
pub struct LoginParams {
    pub email: String,
    pub password: String,
}
