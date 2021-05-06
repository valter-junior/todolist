CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) UNIQUE NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE list(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(256)
);

