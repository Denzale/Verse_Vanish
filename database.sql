-- Create the database
CREATE DATABASE lyric_app;

-- Connect to the new database
\c lyric_app

-- Create the table
CREATE TABLE User_Score (
    username    TEXT PRIMARY KEY,
    song_title  TEXT,
    song_api_id INT
);

INSERT INTO User_Score(username, song_title, song_api_id) VALUES
('user1', 'Song A', 1),
('user2', 'Song B', 2),
('user3', 'Song C', 3),
('user4', 'Song D', 4),
('user5', 'Song E', 5),
('user6', 'Song F', 6),
('user7', 'Song G', 7),
('user8', 'Song H', 8),
('user9', 'Song I', 9),
('user10', 'Song J', 10);