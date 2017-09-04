DROP DATABASE IF EXISTS dumpach;
CREATE DATABASE dumpach;

\c dumpach

CREATE TABLE b_threads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE b_posts (
    id SERIAL PRIMARY KEY,
    thread_id INT REFERENCES b_threads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    text TEXT,
    sage BOOLEAN
);

CREATE TABLE dev_threads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE dev_posts (
    id SERIAL PRIMARY KEY,
    thread_id INT REFERENCES dev_threads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    text TEXT,
    sage BOOLEAN
);