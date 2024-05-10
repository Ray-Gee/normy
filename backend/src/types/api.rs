use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResponse {
    pub message: String,
}

#[derive(Serialize)]
pub struct TokenResponse {
    #[serde(flatten)]
    pub base: ApiResponse,
    pub token: String,
}
