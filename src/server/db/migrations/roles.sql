\c dumpach

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles(title) VALUES ('admin');
INSERT INTO roles(title) VALUES ('moderator');