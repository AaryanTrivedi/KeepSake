CREATE DATABASE posts_app;
USE posts_app;
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(50) UNIQUE KEY,
    bio VARCHAR(10000) DEFAULT 'Empty',
    email VARCHAR(50) UNIQUE KEY,
    password VARCHAR(100),
    otp int(10),
    followers INT DEFAULT 0,
    isActive INT(1) DEFAULT 0,
    lastLogin TIMESTAMP,
    createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    message VARCHAR(10000) NOT NULL,
    isPublic INT(1) DEFAULT 0,
    userId INT,
    status INT(1) DEFAULT 2, 
    likes INT DEFAULT 0,
    createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);