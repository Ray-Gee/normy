use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct AuthConfirmParams {
    pub user_id: String,
    pub token: String,
}
