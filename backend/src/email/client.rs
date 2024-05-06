use crate::auth::token;
use crate::config::constants;
use crate::models::User;
use lettre::{transport::smtp::authentication::Credentials, Message, SmtpTransport, Transport};
use log::{debug, error, info};
use std::env;

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

pub async fn send_confirmation_email(user: &User) -> Result<(), String> {
    let link = match user.id {
        Some(user_id) => Some(token::generate_confirmation_link(&user_id.to_string())),
        None => {
            error!("Expected a UUID but found None");
            return Err("No UUID found for user.".to_string());
        }
    };
    let message = constants::generate_message(
        &user.name,
        constants::COMPNAY_NAME,
        &*link.expect("Expected Option<String>"),
    );
    debug!("message: {:?}", message);
    match send_email(&user.email.as_str(), constants::SUBJECT, &message).await {
        Ok(_) => {
            info!("Sent successfully!");
            Ok(())
        }
        Err(e) => {
            error!("Failed to send: {:?}", e);
            Err("Failed to send email.".to_string())
        }
    }
}
