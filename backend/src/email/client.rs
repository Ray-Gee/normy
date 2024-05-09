use crate::auth::token;
use crate::config::constants;
use crate::db;
use crate::types::User;
use lettre::{transport::smtp::authentication::Credentials, Message, SmtpTransport, Transport};
use log::{debug, error, info};
use std::env;
use tokio_postgres::Client;

pub async fn send_email(
    to: &str,
    subject: &str,
    body: &str,
) -> Result<(), lettre::transport::smtp::Error> {
    let from = env::var("GMAIL_ADDRESS").expect("GMAIL_ADDRESS must be set");
    let smtp_server = env::var("GMAIL_SMTP_SERVER").expect("GMAIL_SMTP_SERVER must be set");
    let smtp_username = env::var("GMAIL_USERNAME").expect("GMAIL_USERNAME must be set");
    let smtp_password = env::var("GMAIL_APP_PASSWORD").expect("GMAIL_APP_PASSWORD must be set");

    let email = Message::builder()
        .from(from.parse().unwrap())
        .to(to.parse().unwrap())
        .subject(subject)
        .body(String::from(body))
        .unwrap();

    let creds = Credentials::new(smtp_username, smtp_password);

    let mailer = SmtpTransport::relay(&smtp_server)?
        .credentials(creds)
        .build();

    match mailer.send(&email) {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}

pub async fn send_confirmation_email(client: &Client, user: &User) -> Result<(), String> {
    let user_id = match &user.id {
        Some(id) => id,
        None => {
            error!("Expected a UUID but found None for user.");
            return Err("No UUID found for user.".to_string());
        }
    };

    // トークン生成
    let token = token::generate_confirmation_token();
    let token_type = "activation";
    let expires_at = chrono::Utc::now().naive_utc() + chrono::Duration::days(1);
    let link = token::generate_confirmation_link(&user_id.to_string(), &token);

    // データベースにトークンを保存
    if let Err(e) = db::create_token(client, &user_id, &token, token_type, expires_at).await {
        error!("Failed to save token: {:?}", e);
        return Err("Failed to save token.".to_string());
    }

    // メッセージ生成
    let message = constants::generate_message(&user.name, constants::COMPANY_NAME, &link);
    debug!("Sending confirmation email: {:?}", message);

    // メール送信
    match send_email(user.email.as_str(), constants::SUBJECT, &message).await {
        Ok(_) => {
            info!("Confirmation email sent successfully!");
            Ok(())
        }
        Err(e) => {
            error!("Failed to send confirmation email: {:?}", e);
            Err("Failed to send email.".to_string())
        }
    }
}
