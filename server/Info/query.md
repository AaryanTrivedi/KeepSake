CREATE DATABASE POSTS_APP;
USE POSTS_APP;
CREATE TABLE USERS(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FIRSTNAME VARCHAR(50),
    LASTNAME VARCHAR(50),
    USERNAME VARCHAR(50) UNIQUE KEY,
    BIO VARCHAR(10000),
    EMAIL VARCHAR(50) UNIQUE KEY,
    PASSWORD VARCHAR(100),
    FOLLOWERS INT,
    ACTIVE INT(1) DEFAULT 0, --SET 1 TO ACTIVE 0 TO DELETE
    LASTLOGIN TIMESTAMP,
    TIMEOFCREATION TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE POSTS(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(100),
    MESSAGE VARCHAR(30000),
    PUBLIC INT(1) DEFAULT 0,
    USERID INT,
    STATUS INT(1) DEFAULT 2, --SET 1 TO ARCHIVE AND 0 TO DELETE 
    LIKES INT,
    CREATE_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATE_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);