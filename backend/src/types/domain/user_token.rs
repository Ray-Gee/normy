use chrono::{DateTime, Utc};
use uuid::Uuid;

pub struct UserToken {
    pub user_id: Uuid,
    pub token: String,
    pub created_at: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
}
