use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: Option<Uuid>,
    pub name: String,
    pub email: String,
}
