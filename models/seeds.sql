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
