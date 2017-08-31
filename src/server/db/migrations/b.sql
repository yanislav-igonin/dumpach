DROP DATABASE IF EXISTS dumpach;
CREATE DATABASE dumpach;

\c dumpach

CREATE TABLE b_threads (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO b_threads DEFAULT VALUES;
INSERT INTO b_threads DEFAULT VALUES;
INSERT INTO b_threads DEFAULT VALUES;
INSERT INTO b_threads DEFAULT VALUES;

SELECT * FROM b_threads;

CREATE TABLE b_posts (
    id SERIAL PRIMARY KEY,
    "threadId" INT REFERENCES b_threads(id),
    title TEXT,
    text TEXT
);

INSERT INTO b_posts ("threadId", title, text) VALUES (1,'Cocksuckers thread', 'Some dickblowing information');
INSERT INTO b_posts ("threadId", title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts ("threadId", title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts ("threadId", title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts ("threadId", title, text) VALUES (1,'', 'Some dickblowing information');
INSERT INTO b_posts ("threadId", title, text) VALUES (1,'', 'Some dickblowing information');




SELECT * FROM b_posts;