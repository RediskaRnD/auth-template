--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dev; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA dev;


ALTER SCHEMA dev OWNER TO pg_database_owner;

--
-- Name: SCHEMA dev; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA dev IS 'standard public schema';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA dev;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_methods; Type: TABLE; Schema: dev; Owner: postgres
--

CREATE TABLE dev.auth_methods (
    auth_id uuid DEFAULT dev.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    auth_type character varying(50) NOT NULL,
    auth_identifier character varying(255) NOT NULL,
    auth_secret text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE dev.auth_methods OWNER TO postgres;

--
-- Name: oauth_providers; Type: TABLE; Schema: dev; Owner: postgres
--

CREATE TABLE dev.oauth_providers (
    oauth_id uuid DEFAULT dev.uuid_generate_v4() NOT NULL,
    auth_id uuid NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL,
    access_token text,
    refresh_token text,
    expires_at timestamp with time zone
);


ALTER TABLE dev.oauth_providers OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: dev; Owner: postgres
--

CREATE TABLE dev.roles (
    role_id integer NOT NULL,
    role_name character varying(31) NOT NULL
);


ALTER TABLE dev.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: dev; Owner: postgres
--

CREATE SEQUENCE dev.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dev.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: dev; Owner: postgres
--

ALTER SEQUENCE dev.roles_role_id_seq OWNED BY dev.roles.role_id;


--
-- Name: user_roles; Type: TABLE; Schema: dev; Owner: postgres
--

CREATE TABLE dev.user_roles (
    user_id uuid NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE dev.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: dev; Owner: postgres
--

CREATE TABLE dev.users (
    user_id uuid DEFAULT dev.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE dev.users OWNER TO postgres;

--
-- Name: roles role_id; Type: DEFAULT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.roles ALTER COLUMN role_id SET DEFAULT nextval('dev.roles_role_id_seq'::regclass);


--
-- Name: auth_methods auth_methods_pkey; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.auth_methods
    ADD CONSTRAINT auth_methods_pkey PRIMARY KEY (auth_id);


--
-- Name: oauth_providers oauth_providers_pkey; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.oauth_providers
    ADD CONSTRAINT oauth_providers_pkey PRIMARY KEY (oauth_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_auth_identifier; Type: INDEX; Schema: dev; Owner: postgres
--

CREATE INDEX idx_auth_identifier ON dev.auth_methods USING btree (auth_identifier);


--
-- Name: auth_methods auth_methods_user_id_fkey; Type: FK CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.auth_methods
    ADD CONSTRAINT auth_methods_user_id_fkey FOREIGN KEY (user_id) REFERENCES dev.users(user_id) ON DELETE CASCADE;


--
-- Name: oauth_providers oauth_providers_auth_id_fkey; Type: FK CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.oauth_providers
    ADD CONSTRAINT oauth_providers_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES dev.auth_methods(auth_id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES dev.roles(role_id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: dev; Owner: postgres
--

ALTER TABLE ONLY dev.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES dev.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

