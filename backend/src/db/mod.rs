use crate::models::User;
use actix_web::HttpResponse;
use bcrypt::{hash, DEFAULT_COST};
use log::{debug, error, info};
use std::error::Error;
use tokio_postgres::Client;
use uuid::Uuid;
type DbError = tokio_postgres::Error;

pub mod connections;

pub async fn create_and_fetch_user(client: &Client, user: &User) -> Result<User, HttpResponse> {
    match create_user(client, user).await {
        Ok(user_id) => {
            info!("User created with ID: {}", user_id);
            fetch_user(client, user_id).await.map_err(|e| {
                error!("Failed to retrieve user: {:?}", e);
                HttpResponse::InternalServerError().body("Failed to retrieve created user")
            })
        }
        Err(e) => {
            error!("Failed to create user: {:?}", e);
            Err(HttpResponse::InternalServerError().body("Internal error during user creation"))
        }
    }
}

pub async fn create_token(
    client: &Client,
    user_id: &Uuid,
    token: &str,
    token_type: &str,
    expires_at: chrono::NaiveDateTime,
) -> Result<Uuid, Box<dyn Error>> {
    debug!("Attempting to create token for user: {}", &user_id);

    let query = "INSERT INTO user_tokens (user_id, token, token_type, expires_at) VALUES ($1, $2, $3, $4) RETURNING id";
    match client
        .query_one(query, &[&user_id, &token, &token_type, &expires_at])
        .await
    {
        Ok(row) => {
            let id: Uuid = row.get(0);
            debug!("Token created with ID: {:?}", id);
            Ok(id)
        }
        Err(e) => {
            error!("Failed to create token: {:?}", e);
            Err(Box::new(e))
        }
    }
}

pub async fn create_user(client: &Client, user: &User) -> Result<Uuid, Box<dyn Error>> {
    let hashed_password = match &user.password {
        Some(password) => hash(password, DEFAULT_COST).expect("Failed to hash password"),
        None => {
            error!("Password is required but was not provided.");
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Password is required",
            )));
        }
    };

    debug!("Attempting to create user: {}, {}", &user.name, &user.email);

    let query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
    match client
        .query_one(query, &[&user.name, &user.email, &hashed_password])
        .await
    {
        Ok(row) => {
            let id: Uuid = row.get(0);
            debug!("User created with ID: {:?}", id);
            Ok(id)
        }
        Err(e) => {
            error!("Failed to create user: {:?}", e);
            Err(Box::new(e))
        }
    }
}

pub async fn fetch_user(client: &Client, user_id: Uuid) -> Result<User, DbError> {
    info!("user_id: {:?}", user_id);
    let row = client
        .query_one(
            "SELECT id, name, email FROM users WHERE id = $1",
            &[&user_id],
        )
        .await?;
    Ok(User {
        id: row.get(0),
        name: row.get(1),
        email: row.get(2),
        password: None,
    })
}

pub async fn fetch_user_by_id(client: &Client, user_id: Uuid) -> Result<User, DbError> {
    let stmt = "SELECT id, name, email FROM users WHERE id = $1";
    client.query_one(stmt, &[&user_id]).await.map(|row| User {
        id: row.get(0),
        name: row.get(1),
        email: row.get(2),
        password: None,
    })
}

pub async fn fetch_all_users(client: &Client) -> Result<Vec<User>, DbError> {
    info!("fetch_all_users 中身");
    let mut users = Vec::new();
    let statement = "SELECT id, name, email FROM users";
    let rows = client.query(statement, &[]).await?;

    for row in rows {
        users.push(User {
            id: row.get(0),
            name: row.get(1),
            email: row.get(2),
            password: None,
        });
    }
    debug!("users: {:?}", users);
    Ok(users)
}

pub async fn update_user(client: &Client, user: &User, user_id: Uuid) -> Result<(), DbError> {
    let statement = "UPDATE users SET name = $1, email = $2 WHERE id = $3";
    client
        .execute(statement, &[&user.name, &user.email, &user_id])
        .await?;
    Ok(())
}

pub async fn delete_user(client: &Client, user_id: Uuid) -> Result<u64, DbError> {
    let statement = "DELETE FROM users WHERE id = $1";
    let rows_affected = client.execute(statement, &[&user_id]).await?;
    Ok(rows_affected)
}
