\c dumpach

CREATE TABLE roles_permissions (
  id SERIAL PRIMARY KEY,
  role_id INT REFERENCES roles(id),
  permission_id INT REFERENCES permissions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 1); --admin - read users
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 2); --admin - create users
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 3); --admin - edit users
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 4); --admin - delete users

INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 5); --admin - read threads
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 6); --admin - create threads
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 7); --admin - edit threads
INSERT INTO roles_permissions(role_id, permission_id) VALUES (1, 8); --admin - delete threads