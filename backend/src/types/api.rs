use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResponse {
    pub message: String,
}

#[derive(Serialize)]
pub struct JwtResponse {
    #[serde(flatten)]
    pub base: ApiResponse,
    pub jwt: String,
}
