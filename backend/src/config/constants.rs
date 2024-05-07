use lazy_static::lazy_static;
use once_cell::sync::Lazy;
use std::env;

pub const COMPANY_NAME: &str = "Ueda Company";
pub const SUBJECT: &str = "Confirm Your Registration";

static MESSAGE_TEMPLATE: Lazy<String> = Lazy::new(|| {
    String::from(
        "Hello {{user_name}},\n\n\
        Thank you for registering with us. Please click on the link below to confirm your email address and activate your account:\n\n\
        {{confirmation_link}}\n\n\
        If you did not register for this account, no further action is required.\n\n\
        Regards,\n\
        {{company_name}} Team"
    )
});

pub fn generate_message(user_name: &str, company_name: &str, confirmation_link: &str) -> String {
    MESSAGE_TEMPLATE
        .replace("{{user_name}}", user_name)
        .replace("{{company_name}}", company_name)
        .replace("{{confirmation_link}}", confirmation_link)
}

lazy_static! {
    pub static ref DB_URL: String = {
        format!(
            "postgres://{}:{}@localhost:5432/{}",
            env::var("POSTGRES_USER").expect("POSTGRES_USER must be set"),
            env::var("POSTGRES_PASSWORD").expect("POSTGRES_PASSWORD must be set"),
            env::var("POSTGRES_DB").expect("POSTGRES_DB must be set")
        )
    };
}
