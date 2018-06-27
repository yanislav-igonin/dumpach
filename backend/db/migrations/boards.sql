DROP DATABASE IF EXISTS dumpach;
CREATE DATABASE dumpach;

\c dumpach

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    thread_id INT REFERENCES threads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    text TEXT,
    sage BOOLEAN
);

-- CREATE TABLE replies (
--     post_id INT REFERENCES b_posts(id) ON DELETE CASCADE,
--     reply_id INT REFERENCES b_posts(id)
-- );

-- CREATE TABLE attachments (
--     thread_id INT REFERENCES b_threads(id) ON DELETE CASCADE,
--     post_id INT REFERENCES b_posts(id),
--     name TEXT PRIMARY KEY
-- );