psql -U postgres < boards.sql;
echo "boards migrated"
psql -U postgres < roles.sql;
echo "roles migrated"
psql -U postgres < actions.sql;
echo "actions migrated"
psql -U postgres < users.sql;
echo "users migrated"
# psql -U postgres < roles_permissions.sql;
# echo "roles_permissions migrated"