CREATE TABLE "users" (
    "_id" bigserial PRIMARY KEY,
    "phone" varchar NOT NULL,
    "email" varchar NOT NULL,
    "hash" varchar NOT NULL,
    "user_type" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now())
)