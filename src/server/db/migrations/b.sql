DROP DATABASE IF EXISTS dumpach;
CREATE DATABASE dumpach;

\c dumpach

CREATE TABLE b_threads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO b_threads DEFAULT VALUES;

SELECT * FROM b_threads;

CREATE TABLE b_posts (
    id SERIAL PRIMARY KEY,
    thread_id INT REFERENCES b_threads(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    text TEXT,
    sage BOOLEAN
);

INSERT INTO b_posts (thread_id, title, text) VALUES (1,'Cocksuckers thread', 'Some dickblowing information');
INSERT INTO b_posts (thread_id, title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts (thread_id, title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts (thread_id, title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts (thread_id, title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts (thread_id, title, text) VALUES (1,'', 'Some dickblowing information');




SELECT * FROM b_posts;