DROP TABLE IF EXISTS cities;

CREATE TABLE cities(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    image TEXT,
    join_date TIMESTAMP(6) DEFAULT now(),
    cities_id INT REFERENCES cities
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE REVIEWS(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    users_id INT REFERENCES users,
    cities_id INT REFERENCES cities
);

DROP TABLE IF EXISTS session;

CREATE TABLE "session"(
    "sid" VARCHAR NOT NULL COLLATE "default",
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6)
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;