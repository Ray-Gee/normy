use postgres::{Client, NoTls};
use uuid::Uuid;
use log::{info, warn};
use crate::models::User;
use crate::config;

pub fn get_user_request_body(request: &str) -> Result<User, serde_json::Error> {
    serde_json::from_str(request.split("\r\n\r\n").last().unwrap_or_default())
}

pub fn handle_post_request(request: &str) -> (String, String) {
    match (
        get_user_request_body(request),
        Client::connect(config::DB_URL.as_str(), NoTls),
    ) {
        (Ok(user), Ok(mut client)) => {
            let user_id = Uuid::new_v4();
            client.execute(
                "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
                &[&user_id, &user.name, &user.email],
            ).unwrap();

            // Fetch the created user data
            match client.query_one(
                "SELECT id, name, email FROM users WHERE id = $1",
                &[&user_id],
            ) {
                Ok(row) => {
                    let user = User {
                        id: row.get(0),
                        name: row.get(1),
                        email: row.get(2),
                    };

                    (
                        config::constants::OK_RESPONSE.to_string(),
                        serde_json::to_string(&user).unwrap(),
                    )
                }
                Err(_) => (
                    config::constants::INTERNAL_ERROR.to_string(),
                    "Failed to retrieve created user".to_string(),
                ),
            }
        }
        _ => (config::constants::INTERNAL_ERROR.to_string(), "Internal error".to_string()),
    }
}

//handle get request
pub fn handle_get_request(request: &str) -> (String, String) {
    info!("request: {:?}", &request);
    match (get_id(&request), Client::connect(config::DB_URL.as_str(), NoTls)) {
        (Ok(id), Ok(mut client)) =>
            match client.query_one("SELECT * FROM users WHERE id = $1", &[&id]) {
                Ok(row) => {
                    let user = User {
                        id: row.get(0),
                        name: row.get(1),
                        email: row.get(2),
                    };
                    info!("User found: {:?}", user);
                    (config::constants::OK_RESPONSE.to_string(), serde_json::to_string(&user).unwrap())
                }
                _ => {
                    warn!("Failed to fetch user:");
                    (config::constants::NOT_FOUND.to_string(), "User not found".to_string())
                }
            }

        _ => (config::constants::INTERNAL_ERROR.to_string(), "Internal error".to_string()),
    }
}

//handle get all request
pub fn handle_get_all_request(_request: &str) -> (String, String) {
    match Client::connect(config::DB_URL.as_str(), NoTls) {
        Ok(mut client) => {
            let mut users = Vec::new(); // Vector to store the users

            for row in client.query("SELECT id, name, email FROM users", &[]).unwrap() {
                users.push(User {
                    id: row.get(0),
                    name: row.get(1),
                    email: row.get(2),
                });
            }

            (config::constants::OK_RESPONSE.to_string(), serde_json::to_string(&users).unwrap())
        }
        _ => (config::constants::INTERNAL_ERROR.to_string(), "Internal error".to_string()),
    }
}

//handle put request
pub fn handle_put_request(request: &str) -> (String, String) {
    match
        (
            get_id(&request),
            get_user_request_body(&request),
            Client::connect(config::DB_URL.as_str(), NoTls),
        )
    {
        (Ok(id), Ok(user), Ok(mut client)) => {
            client
                .execute(
                    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
                    &[&user.name, &user.email, &id]
                )
                .unwrap();

            (config::constants::OK_RESPONSE.to_string(), "User updated".to_string())
        }
        _ => (config::constants::INTERNAL_ERROR.to_string(), "Internal error".to_string()),
    }
}

//handle delete request
pub fn handle_delete_request(request: &str) -> (String, String) {
    match (get_id(&request), Client::connect(config::DB_URL.as_str(), NoTls)) {
        (Ok(id), Ok(mut client)) => {
            let rows_affected = client.execute("DELETE FROM users WHERE id = $1", &[&id]).unwrap();

            //if rows affected is 0, user not found
            if rows_affected == 0 {
                return (config::constants::NOT_FOUND.to_string(), "User not found".to_string());
            }

            (config::constants::OK_RESPONSE.to_string(), "User deleted".to_string())
        }
        _ => (config::constants::INTERNAL_ERROR.to_string(), "Internal error".to_string()),
    }
}


fn get_id(request: &str) -> Result<Uuid, String> {
    info!("request: {}", request);
    let maybe_id = request
        .split("/")
        .nth(4)
        .unwrap_or_default()
        .split_whitespace()
        .next()
        .unwrap_or_default();

    Uuid::parse_str(maybe_id)
        .map_err(|_| "Failed to parse UUID from request".to_string())
}