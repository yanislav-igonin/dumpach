\c dumpach

CREATE TABLE actions (
  id SERIAL PRIMARY KEY,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() 
);

INSERT INTO actions(title) VALUES ('read');
INSERT INTO actions(title) VALUES ('create');
INSERT INTO actions(title) VALUES ('edit');
INSERT INTO actions(title) VALUES ('delete');