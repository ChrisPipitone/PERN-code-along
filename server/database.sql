CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
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


CREATE TABLE user_todos(
    uid uuid,
    tid INT,
    PRIMARY KEY (uid, tid),
    CONSTRAINT fk_user FOREIGN KEY(uid) REFERENCES users(user_id),
    CONSTRAINT fk_todo FOREIGN KEY(tid) REFERENCES todo(todo_id)
);

-- query to find all todos of a user 

-- query to find a specific todo of a user