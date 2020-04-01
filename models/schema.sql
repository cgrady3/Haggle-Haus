DROP DATABASE IF EXISTS haggle_db;

CREATE DATABASE haggle_db;

USE haggle_db;

CREATE DATABASE haggle_db;

USE haggle_db;

create table users(
id int auto_increment not null,
username varchar (15) not null,
password varchar (15) not null,
primary key (id)
);

create table item (
id int auto_increment not null,
name varchar (40) not null,
description varchar (140) not null,
base_barter varchar (40),
base_barter_amount int,
amount int not null,
sold boolean,
picture varchar (400),
primary key (id),
foreign key (userID) references users (id)
);

create table bid(
id int auto_increment not null,
bid varchar(40) not null,
amount int not null,
description varchar (400) not null,
accepted boolean,
picture varchar (400),
primary key (id),
foreign key (userID) references users (id),
foreign key (itemID) references item (id)
);
