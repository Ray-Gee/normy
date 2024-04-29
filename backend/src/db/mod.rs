// use postgres::{Client, NoTls};
// use crate::config;

// pub fn set_database() -> Result<(), postgres::Error> {
//     let mut client = Client::connect(config::DB_URL.as_str(), NoTls)?;
//     client.batch_execute(
//         "
//         CREATE TABLE IF NOT EXISTS users (
//             id UUID PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL
//         )
//         "
//     )?;
//     Ok(())
// }
