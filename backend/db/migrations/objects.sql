\c dumpach

CREATE TABLE objects (
  id SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO objects(name) VALUES ('user');
INSERT INTO objects(name) VALUES ('user_admin');
INSERT INTO objects(name) VALUES ('user_moderator');
INSERT INTO objects(name) VALUES ('thread');