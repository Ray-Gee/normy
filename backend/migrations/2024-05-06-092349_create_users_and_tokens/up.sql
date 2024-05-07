CREATE TABLE user_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    token VARCHAR NOT NULL,
    token_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    UNIQUE(token)
);

ALTER TABLE user_tokens
ADD CONSTRAINT fk_user_tokens_user_id
FOREIGN KEY (user_id)
REFERENCES users (id) ON DELETE CASCADE;