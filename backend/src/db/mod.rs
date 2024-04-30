use crate::models::User;
use log::info;
use tokio_postgres::{Client, Error};
use uuid::Uuid;

pub async fn create_user(client: &Client, user: &User) -> Result<Uuid, Error> {
    let user_id = Uuid::new_v4();
    client
        .execute(
            "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
            &[&user_id, &user.name, &user.email],
        )
        .await?;
    Ok(user_id)
}

pub async fn fetch_user(client: &Client, user_id: Uuid) -> Result<User, Error> {
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
    })
}

pub async fn fetch_user_by_id(
    client: &tokio_postgres::Client,
    user_id: Uuid,
) -> Result<User, Error> {
    let stmt = "SELECT id, name, email FROM users WHERE id = $1";
    client.query_one(stmt, &[&user_id]).await.map(|row| User {
        id: row.get(0),
        name: row.get(1),
        email: row.get(2),
    })
}

pub async fn fetch_all_users(client: &Client) -> Result<Vec<User>, Error> {
    info!("fetch_all_users 中身");
    let mut users = Vec::new();
    let statement = "SELECT id, name, email FROM users";
    let rows = client.query(statement, &[]).await?;

    for row in rows {
        users.push(User {
            id: row.get(0),
            name: row.get(1),
            email: row.get(2),
        });
    }

    Ok(users)
}

pub async fn update_user(client: &Client, user: &User, user_id: Uuid) -> Result<(), Error> {
    let statement = "UPDATE users SET name = $1, email = $2 WHERE id = $3";
    client
        .execute(statement, &[&user.name, &user.email, &user_id])
        .await?;
    Ok(())
}

pub async fn delete_user(client: &Client, user_id: Uuid) -> Result<u64, Error> {
    let statement = "DELETE FROM users WHERE id = $1";
    let rows_affected = client.execute(statement, &[&user_id]).await?;
    Ok(rows_affected)
}
