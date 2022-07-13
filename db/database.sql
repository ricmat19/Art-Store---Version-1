CREATE DATABASE store;

CREATE TABLE products(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    product VARCHAR(50),
    price MONEY,
    info VARCHAR(300),
    imagekey VARCHAR(300)
);

CREATE TABLE cart(
    id BIGSERIAL PRIMARY KEY,
    cart VARCHAR[],
    email VARCHAR(255),
    qty VARCHAR[]
);

