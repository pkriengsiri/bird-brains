DROP DATABASE IF EXISTS birdbrains_db;

CREATE DATABASE birdbrains_db;

USE birdbrains_db;

-- The following database schema contains three tables:

-- __________________________________________________

-- * **users**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** -  VARCHAR(255)
--   * **last_name** -  VARCHAR(255)
--   * **user_name** -  VARCHAR(255)
--   * **email** -  VARCHAR(255)
--   * **score** - INT

CREATE TABLE users(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
user_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
score INTEGER NOT NULL,
PRIMARY KEY(id)
);

-- Add dummy data to the users table...
--   * **id** - INT PRIMARY KEY
--   * **first_name** -  VARCHAR(255)
--   * **last_name** -  VARCHAR(255)
--   * **user_name** -  VARCHAR(255)
--   * **email** -  VARCHAR(255)
--   * **score** - INT

INSERT INTO users (first_name, last_name, user_name, email, score)
VALUES ("Roger", "Waters", "pigsInSpace", "roger@waters.com", 65060);
INSERT INTO users (first_name, last_name, user_name, email, score)
VALUES ("Betty", "White", "snickersInSpace", "betty@white.com", 65006);
INSERT INTO users (first_name, last_name, user_name, email, score)
VALUES ("Michael", "Tyson", "ironmike", "magikith@boxing.com", 6000);
INSERT INTO users (first_name, last_name, user_name, email, score)
VALUES ("Sun", "Tzu", "warriorartist", "art@ofwaters.com", 5000);
INSERT INTO users (first_name, last_name, user_name, email, score)
VALUES ("Bruce", "Lee", "waaaaaah", "bruce@lee.com", 650000);


-- Test the users table...

SELECT * FROM users;

-- __________________________________________________

-- * **birds**:

--   * **id** - INT PRIMARY KEY
--   * **common_name** - VARCHAR(255)
--   * **scientific_name** - VARCHAR(255)
--   * **points** - INT

CREATE TABLE birds(
id INTEGER auto_increment NOT NULL,
common_name VARCHAR(255) NOT NULL,
scientific_name VARCHAR(255) NOT NULL,
points INTEGER NOT NULL,
PRIMARY KEY(id)
);

-- Add dummy data to birds table...
--   * **id** - INT PRIMARY KEY
--   * **common_name** - VARCHAR(255)
--   * **scientific_name** - VARCHAR(255)
--   * **points** - INT

INSERT INTO birds (common_name, scientific_name, points)
values ("Oriole", "Oriolus chinensis", 1); 
INSERT INTO birds (common_name, scientific_name, points)
values ("Blue Jay", "Cyanocitta cristata", 2);
INSERT INTO birds (common_name, scientific_name, points)
values ("Cardinal", "Cardinalis cardinalis", 3); 
INSERT INTO birds (common_name, scientific_name, points)
values ("Red-winged blackbird", "Agelaius phoeniceus", 4);
INSERT INTO birds (common_name, scientific_name, points)
values ("American goldfinch", "Spinus tristis", 5);

-- Test birds table...

SELECT * FROM birds;

-- __________________________________________________

-- * **sightings**:

--   * **id** - INT PRIMARY KEY
--   * **location** - VARCHAR(255) <-- "location" is a key word, so it is abbreviated to "loc" in this app.
--   * **comments - TEXT
--   * **user_id - INT (FK on users.id)
--   * **bird_id - INT (FK on birds.id)

CREATE TABLE sightings(
id INTEGER auto_increment NOT NULL,
loc VARCHAR(255) NOT NULL,
comments TEXT,
users_id INTEGER,
CONSTRAINT fk_users_id FOREIGN KEY (users_id) REFERENCES users(id),
birds_id INTEGER,
CONSTRAINT fk_birds_id FOREIGN KEY (birds_id) REFERENCES birds(id),
PRIMARY KEY(id)
);

-- Add dummy data to the sightings table...
--   * **id** - INT PRIMARY KEY
--   * **location** - VARCHAR(255) <-- "location" is a key word, so it is abbreviated to "loc" in this app.
--   * **comments - TEXT
--   * **user_id - INT (FK on users.id)
--   * **bird_id - INT (FK on birds.id)

INSERT INTO sightings (loc, comments)
VALUES ("Philadelphia", "Oriole");
INSERT INTO sightings (loc, comments)
VALUES ("Atlanta", "Blue Jay");
INSERT INTO sightings (loc, comments)
VALUES ("St. Simons Island", "Cardinal");
INSERT INTO sightings (loc, comments)
VALUES ("Stone Mountain", "Eastern Blackbird");
INSERT INTO sightings (loc, comments)
VALUES ("Nagoya", "Finch");

-- Test sightings table...

SELECT * FROM sightings;
