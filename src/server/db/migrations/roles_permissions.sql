\c dumpach

CREATE TABLE roles_permissions (
  id SERIAL PRIMARY KEY,
  role_id INT REFERENCES roles(id),
  action_id INT REFERENCES actions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles_permissions(role_id, action_id) VALUES (1, 1); --admin - read
INSERT INTO roles_permissions(role_id, action_id) VALUES (1, 2); --admin - delete
INSERT INTO roles_permissions(role_id, action_id) VALUES (1, 3); --admin - add_user
INSERT INTO roles_permissions(role_id, action_id) VALUES (1, 4); --admin - delete_user