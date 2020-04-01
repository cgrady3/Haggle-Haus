USE haggle_db;

INSERT INTO users
    (username, password, createdAt, updatedAt
    )
VALUES
    ("HaggleHans", "getthisbread", NOW(), NOW());

INSERT INTO users
    (username, password, createdAt, updatedAt
    )
VALUES
    ("TradingTracy", "excuseme", NOW(), NOW());

INSERT INTO users
    (username, password, createdAt, updatedAt
    )
VALUES
    ("BarterBenny", "password", NOW(), NOW());

INSERT INTO users
    (username, password, createdAt, updatedAt
    )
VALUES
    ("PeddlingPat", "buymystuff", NOW(), NOW());

INSERT INTO items
    (name, description, base_barter, base_barter_amount, amount, createdAt, updatedAt, UserId)
VALUES
    ("demin skirt", "it's a short skirt", "jeans", 1, 1, NOW(), NOW(), 2);

INSERT INTO items
    (name, description, base_barter, base_barter_amount, amount, createdAt, updatedAt, UserId)
VALUES
    ("hoodie", "it's a pink hoodie", "sweater", 2, 1, NOW(), NOW(), 1);

INSERT INTO bids
    (bid, amount, description, createdAt, updatedAt, UserId, ItemId)
VALUES
    ("lysol", 3, "some lysol", NOW(), NOW(), 3, 1);

INSERT INTO bids
    (bid, amount, description, createdAt, updatedAt, UserId, ItemId)
VALUES
    ("towels", 2, "some towels", NOW(), NOW(), 1, 2);





/*
CREATE TABLE
IF NOT EXISTS `items`
(`id` INTEGER NOT NULL auto_increment , `name` VARCHAR
(255) NOT NULL, `description` TEXT NOT NULL, `base_barter` VARCHAR
(255), `base_barter_amount` INTEGER, `amount` INTEGER NOT NULL, `sold` TINYINT
(1) DEFAULT false, `picture` VARCHAR
(255) DEFAULT 'https://cdn.clipart.email/4c2ef11c7e671bae0244a859318e1146_trading-clipart-4-clipart-station_1300-1390.jpeg', 
`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER NOT NULL, PRIMARY KEY
(`id`), FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE NO ACTION ON
UPDATE CASCADE) E
*/