use chrono::Utc;
use log::{debug, error, info};
use std::error::Error;
use tokio_postgres::Client;
use uuid::Uuid;
type DbError = tokio_postgres::Error;

pub async fn delete_token(client: &Client, token: &String) -> Result<u64, DbError> {
    let statement = "DELETE FROM user_tokens WHERE token = $1";
    let rows_affected = client.execute(statement, &[&token]).await?;
    Ok(rows_affected)
}

pub async fn fetch_token_is_valid(
    client: &Client,
    token: &str,
    user_id: &Uuid,
) -> Result<bool, DbError> {
    info!("user_id: {:?}", user_id);
    let stmt = "
        SELECT EXISTS (
            SELECT 1 FROM user_tokens
            WHERE token = $1 AND user_id = $2 AND expires_at > NOW()
        );
    ";
    let row = client.query_one(stmt, &[&token, &user_id]).await?;
    Ok(row.get(0))
}

pub async fn update_activated_at(client: &Client, user_id: &Uuid) -> Result<(), DbError> {
    let statement = "UPDATE users SET activated_at = $1 WHERE id = $2";
    client
        .execute(statement, &[&Utc::now().naive_utc(), &user_id])
        .await?;
    Ok(())
}

pub async fn create_token(
    client: &Client,
    user_id: &Uuid,
    token: &str,
    token_type: &str,
    expires_at: chrono::NaiveDateTime,
) -> Result<String, Box<dyn Error>> {
    debug!("Attempting to create token for user: {}", &user_id);

    let query = "INSERT INTO user_tokens (user_id, token, token_type, expires_at) VALUES ($1, $2, $3, $4) RETURNING token";
    match client
        .query_one(query, &[&user_id, &token, &token_type, &expires_at])
        .await
    {
        Ok(row) => {
            let token: String = row.get(0);
            debug!("Token created with token: {:?}", token);
            Ok(token)
        }
        Err(e) => {
            error!("Failed to create token: {:?}", e);
            Err(Box::new(e))
        }
    }
}
