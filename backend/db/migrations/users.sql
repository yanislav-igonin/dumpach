\c dumpach

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  login TEXT UNIQUE,
  password_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN,
  role_id INT REFERENCES roles(id)
);