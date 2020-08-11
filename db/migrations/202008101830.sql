CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    date DATE,
    keywords VARCHAR,
    description VARCHAR,
    decision VARCHAR
);