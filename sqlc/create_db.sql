CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET search_path TO "dev";

CREATE TABLE IF NOT EXISTS Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Auth_Methods (
    auth_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    auth_type VARCHAR(50) NOT NULL,
    auth_identifier VARCHAR(255) NOT NULL,
    auth_secret TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_auth_identifier ON Auth_Methods(auth_identifier);

CREATE TABLE IF NOT EXISTS OAuth_Providers (
    oauth_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    FOREIGN KEY (auth_id) REFERENCES Auth_Methods (auth_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(31) UNIQUE NOT NULL
);

-- Insert roles
INSERT INTO Roles (role_name) VALUES ('admin'), ('moderator'), ('user');

CREATE TABLE IF NOT EXISTS User_Roles (
    user_id UUID NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles (role_id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, role_id)
);
