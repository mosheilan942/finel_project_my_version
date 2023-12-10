-- Active: 1700477906003@@127.0.0.1@5432@fullstack

CREATE DATABASE fullstack;

CREATE TABLE
    IF NOT EXISTS users(
        userid uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        contactNumber NUMERIC,
        payment TEXT,
        address JSONB DEFAULT '{"country": "", "city": "", "street":"", "zip_code":""}'
    );

CREATE TABLE
    IF NOT EXISTS cartitems (
        userId UUID,
        productId UUID PRIMARY KEY,
        quantity NUMERIC,
        quantityOfProduct NUMERIC,
        salePrice NUMERIC,
        name TEXT,
        description TEXT,
        discount NUMERIC,
        image JSONB DEFAULT '{"image": {"url": " "}}',
        UNIQUE(productId, userId),
        CONSTRAINT userId FOREIGN KEY(userId) REFERENCES users(userId)
    );

CREATE TABLE
    IF NOT EXISTS reviews(
        userid UUID NOT NULL,
        productid UUID NOT NULL,
        author TEXT,
        title TEXT,
        body TEXT,
        rating NUMERIC,
        thumbUp NUMERIC,
        thumbDown NUMERIC,
        CONSTRAINT userid FOREIGN KEY(userid) REFERENCES users(userid),
        CONSTRAINT productid FOREIGN KEY(productid) REFERENCES cartitems(productid)
    );

CREATE TABLE
    IF NOT EXISTS Entrytracking(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        userid UUID,
        name TEXT,
        login_time TIMESTAMP(6) DEFAULT NOW(),
        CONSTRAINT userid FOREIGN KEY(userid) REFERENCES users(userid)
    );

DROP Table users;

DROP Table cartitems;

DROP Table reviews;

DROP Table Entrytracking;

INSERT INTO
    cartitems (product_id, user_id, quantity)
VALUES (
        'dbdd2ff6-c240-4e2a-b1a2-51be8724f5ca',
        'dbdd2ff6-c240-4e2a-b1a2-51be8724f0ca',
        '11'
    )
INSERT INTO
    users (name, email, password)
VALUES ('moshe', 'ilan', '11')
UPDATE users
SET
add = jsonb_set(
        add
,
            '{country}',
            '"israel"'
    );

jsonb_set(
    add
        jsonb,
        "{country}",
        '{0,country}',
        '"israel"' jsonb [,
        create_missing FALSE]
);

UPDATE users
SET
add = jsonb_set(
        add
,
            '{country}',
            '"israel"',
            false
    );

INSERT INTO
    cartitems (name, email, password, payment)
VALUES (
        'm',
        'moisi6510@gmail.com',
        '11',
        'Payment Method'
    )
UPDATE users
SET
add = jsonb_set(
        add
,
            '{country}',
            '"israel"'
    );

SELECT add ->> 'country' AS Feeling FROM users;

SELECT address FROM users;
SELECT * FROM users;
SELECT * FROM cartitems;
