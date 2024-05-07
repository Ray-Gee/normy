ALTER TABLE user_tokens
DROP CONSTRAINT IF EXISTS fk_user_tokens_user_id;

DROP TABLE IF EXISTS user_tokens;
