use postgres_types::to_sql_checked;
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::error::Error;
use std::fmt;
use tokio_postgres::types::{private::BytesMut, FromSql, IsNull, ToSql, Type};

#[derive(Debug, Clone)]
pub struct Password(String);

impl Password {
    pub fn new(s: &str) -> Result<Password, String> {
        if s.len() >= 8 {
            Ok(Password(s.to_string()))
        } else {
            Err("Password must be at least 8 characters long".to_string())
        }
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for Password {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Serialize for Password {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.0)
    }
}

impl AsRef<[u8]> for Password {
    fn as_ref(&self) -> &[u8] {
        self.0.as_bytes()
    }
}

impl<'de> Deserialize<'de> for Password {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        Password::new(&s).map_err(serde::de::Error::custom)
    }
}

impl<'a> FromSql<'a> for Password {
    fn from_sql(_ty: &Type, raw: &[u8]) -> Result<Self, Box<dyn Error + Sync + Send>> {
        let s = std::str::from_utf8(raw)?;
        Password::new(s).map_err(|e| e.into())
    }

    fn accepts(ty: &Type) -> bool {
        ty == &Type::TEXT || ty == &Type::VARCHAR
    }
}

impl ToSql for Password {
    fn to_sql(
        &self,
        _ty: &Type,
        out: &mut BytesMut,
    ) -> Result<IsNull, Box<dyn Error + Sync + Send>> {
        out.extend_from_slice(self.0.as_bytes());
        Ok(IsNull::No)
    }

    fn accepts(ty: &Type) -> bool {
        ty == &Type::TEXT || ty == &Type::VARCHAR
    }

    to_sql_checked!();
}
