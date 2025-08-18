-- User table with nullable password for passwordless login (temporary for dev)
CREATE TABLE users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) -- NOT NULL constraint removed for passwordless login
);

-- Task table with new fields for external system integration
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    priority VARCHAR(50),
    due_date DATE,
    assignee_id UUID REFERENCES users(user_id),
    -- New fields for external system integration
    external_id VARCHAR(255) UNIQUE,
    source_system VARCHAR(255)
);

-- New table for event logging, as specified in the architecture
CREATE TABLE event_logs (
    log_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload JSON,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Note: The CREATE DATABASE command has been removed as it's typically run once manually.
-- Existing data will be lost. This script is for setting up a new database structure.