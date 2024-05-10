use crate::types::domain::{email, password};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: Option<Uuid>,
    pub name: String,
    pub email: email::Email,
    pub password: Option<password::Password>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AuthenticatedUser {
    pub id: Option<Uuid>,
    pub email: email::Email,
    pub password: Option<password::Password>,
}
