\c dumpach

CREATE TABLE roles {
  id SERIAL PRIMARY KEY,
  title TEXT
};

INSERT INTO roles(title) VALUES ('admin');
INSERT INTO roles(title) VALUES ('moderator');