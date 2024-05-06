use once_cell::sync::Lazy;

// pub const OK_RESPONSE: &str = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\r\nAccess-Control-Allow-Headers: Content-Type\r\n\r\n";
// pub const NOT_FOUND: &str = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
pub const COMPNAY_NAME: &str = "Ueda Company";
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
