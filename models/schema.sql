DROP DATABASE IF EXISTS haggle_db;

CREATE DATABASE haggle_db;

USE haggle_db;

CREATE TABLE users (username, password);

CREATE TABLE bid (bid, amount, description);

CREATE TABLE item (name, description, base_barter, base_barter_amount, amount);