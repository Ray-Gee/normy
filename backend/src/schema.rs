// @generated automatically by Diesel CLI.

diesel::table! {
    user_tokens (token) {
        token -> Varchar,
        user_id -> Uuid,
        #[max_length = 50]
        token_type -> Varchar,
        created_at -> Timestamp,
        expires_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        password -> Varchar,
        activated_at -> Nullable<Timestamp>,
        created_at -> Timestamp,
    }
}

diesel::joinable!(user_tokens -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    user_tokens,
    users,
);
