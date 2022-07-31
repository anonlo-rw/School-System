CREATE DATABASE school;
USE school;

CREATE TABLE administrators (
  `Username` TEXT,
  `Password` TEXT
);

CREATE TABLE students (
  `ID` BIGINT DEFAULT NULL,
  `Name` TEXT,
  `Phone` TEXT,
  `Email` TEXT,
  `Birthdate` DATE DEFAULT NULL,
  `Grade` TINYINT DEFAULT NULL,
  `Address` TEXT,
  `Gender` TEXT
);