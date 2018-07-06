\c dumpach

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  action_id INT REFERENCES actions(id),
  object_id INT REFERENCES objects(id)
);

INSERT INTO permissions(action_id, object_id) VALUES (1, 1); --read - users
INSERT INTO permissions(action_id, object_id) VALUES (2, 2); --create - users_admin
INSERT INTO permissions(action_id, object_id) VALUES (2, 3); --create - users_moderator
INSERT INTO permissions(action_id, object_id) VALUES (3, 1); --edit - users
INSERT INTO permissions(action_id, object_id) VALUES (4, 1); --delete - users

INSERT INTO permissions(action_id, object_id) VALUES (1, 2); --read - threads
INSERT INTO permissions(action_id, object_id) VALUES (2, 2); --create - threads
INSERT INTO permissions(action_id, object_id) VALUES (3, 2); --edit - threads
INSERT INTO permissions(action_id, object_id) VALUES (4, 2); --delete - threads