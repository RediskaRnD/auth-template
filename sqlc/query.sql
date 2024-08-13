-- name: GetUserById :one
SELECT *
FROM users u
WHERE u.id = $1
LIMIT 1;

-- name: GetUserByEmail :one
SELECT *
FROM users u
WHERE u.email = $1
LIMIT 1;

-- name: CreateUserByCredentials :one
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING id;
