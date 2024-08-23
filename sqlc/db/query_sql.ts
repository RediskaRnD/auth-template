import { QueryArrayConfig, QueryArrayResult } from 'pg';

interface Client {
  query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserByIdQuery = `-- name: GetUserById :one
SELECT id, name, email, "emailVerified", image
FROM users u
WHERE u.id = $1
LIMIT 1`;

export interface GetUserByIdArgs {
  id: number;
}

export interface GetUserByIdRow {
  id: number;
  name: string;
  email: string;
  emailverified: Date | null;
  image: string | null;
}

export async function getUserById(client: Client, args: GetUserByIdArgs): Promise<GetUserByIdRow | null> {
  const result = await client.query({
    text: getUserByIdQuery,
    values: [args.id],
    rowMode: 'array'
  });
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row[0],
    name: row[1],
    email: row[2],
    emailverified: row[3],
    image: row[4]
  };
}

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
SELECT id, name, email, "emailVerified", image
FROM users u
WHERE u.email = $1
LIMIT 1`;

export interface GetUserByEmailArgs {
  email: string;
}

export interface GetUserByEmailRow {
  id: number;
  name: string;
  email: string;
  emailverified: Date | null;
  image: string | null;
}

export async function getUserByEmail(client: Client, args: GetUserByEmailArgs): Promise<GetUserByEmailRow | null> {
  const result = await client.query({
    text: getUserByEmailQuery,
    values: [args.email],
    rowMode: 'array'
  });
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row[0],
    name: row[1],
    email: row[2],
    emailverified: row[3],
    image: row[4]
  };
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING id`;

export interface CreateUserArgs {
  name: string;
  email: string;
}

export interface CreateUserRow {
  id: number;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<CreateUserRow | null> {
  const result = await client.query({
    text: createUserQuery,
    values: [args.name, args.email],
    rowMode: 'array'
  });
  if (result.rows.length !== 1) {
    return null;
  }
  const row = result.rows[0];
  return {
    id: row[0]
  };
}

