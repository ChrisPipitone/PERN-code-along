CREATE DATABASE perntodo;

-- need to update 
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) FOREIGN KEY REFERENCES users(user_id),
    description  VARCHAR(225)
);


-- set extention
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(225) NOT NULL,
    user_email VARCHAR(225) NOT NULL,
    user_password VARCHAR(225) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Chris','chrispipitone@gmail', '12345');
     