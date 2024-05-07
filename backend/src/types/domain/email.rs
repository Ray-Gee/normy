use postgres_types::{FromSql, IsNull, ToSql, Type};
use regex::Regex;
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::error::Error;
use std::fmt;
use tokio_postgres::types::private::BytesMut;

pub struct Email(String);

impl Email {
    pub fn new(s: &str) -> Result<Email, String> {
        let email_regex = Regex::new(r"^[^\s@]+@[^\s@]+\.[^\s@]+$").unwrap();
        if email_regex.is_match(s) {
            Ok(Email(s.to_string()))
        } else {
            Err(format!("Invalid email format: {}", s))
        }
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for Email {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Serialize for Email {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.0)
    }
}

impl<'de> Deserialize<'de> for Email {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        Email::new(&s).map_err(serde::de::Error::custom)
    }
}

impl ToSql for Email {
    fn to_sql(&self, _ty: &Type, out: &mut BytesMut) -> Result<IsNull, Box<dyn Error + Sync + Send>>
    where
        Self: Sized,
    {
        out.extend_from_slice(self.0.as_bytes());
        Ok(IsNull::No)
    }

    fn accepts(ty: &Type) -> bool {
        *ty == Type::VARCHAR || *ty == Type::TEXT
    }

    tokio_postgres::types::to_sql_checked!();
}

impl<'a> FromSql<'a> for Email {
    fn from_sql(_ty: &Type, raw: &'a [u8]) -> Result<Self, Box<dyn Error + Sync + Send>> {
        let email = std::str::from_utf8(raw)?;
        Email::new(email).map_err(|e| e.into())
    }

    fn accepts(ty: &Type) -> bool {
        *ty == Type::VARCHAR || *ty == Type::TEXT
    }
}

impl fmt::Debug for Email {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Email({}****)", &self.0[..self.0.find('@').unwrap_or(0)])
    }
}
