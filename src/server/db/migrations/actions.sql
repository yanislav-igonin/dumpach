\c dumpach

CREATE TABLE actions (
  id SERIAL PRIMARY KEY,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() 
);

INSERT INTO actions(title) VALUES ('read');
INSERT INTO actions(title) VALUES ('delete');
INSERT INTO actions(title) VALUES ('add_user');
INSERT INTO actions(title) VALUES ('delete_user');