CREATE DATABASE Travel

--Tour table
CREATE TABLE Tour (
 TourID INT IDENTITY(1, 1) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

INSERT INTO Tour (title, description, duration, price)
VALUES ('Tour to Araboke Sokoke', 'Visiting the mangroove regions', '3 days', 25000.00),
       ('Lake Turkana ', 'Far North of Kenya', '5 days', 40000.00),
       ('Masai Mara', 'Wildbeast migration', '7 days', 60000.00);

-- User Table
CREATE TABLE Users (
  UserID INT IDENTITY (1,1) PRIMARY KEY,
  Name VARCHAR(50),
  Email VARCHAR(100),
  Password VARCHAR(100),
  ContactNumber VARCHAR(20),
  TourID INT,
  FOREIGN KEY (TourID) REFERENCES Tour (TourID) ON DELETE CASCADE ON UPDATE CASCADE
  
);

INSERT INTO Users (Name, Email, Password, ContactNumber)
VALUES ('Jesse Pinkman', 'jpinkman@mail.com', 'password123', '1234567890'),
('Andrew Kibe', 'kibeandy@mail.com', 'pass254', '0987654321');

INSERT INTO Users (Name, Email, Password, ContactNumber)
VALUES('Bosco', 'bosco@mail.com', '1234567', '8549943')
select * from Users

-- Admin Table
CREATE TABLE Admins (
  AdminID INT IDENTITY (1,1) PRIMARY KEY,
  Name VARCHAR(50),
  Email VARCHAR(100),
  Password VARCHAR(100)
);

INSERT INTO Admins (Name, Email, Password)
VALUES ('Bosco', 'bosco@mail.com', 'admin123'),
('Sadio', 'sadio@mail.com', 'adminsadio');
INSERT INTO Admins (Name, Email, Password)
VALUES ('Bruno', 'bruno@mail.com', '1234567')
DELETE FROM Admins
WHERE Name = 'Bosco';

select * from Admins
--Bookings table
CREATE TABLE bookings (
  bookingsID INT IDENTITY (1,1) PRIMARY KEY,
  TourID INT,
  UserID INT,
 FOREIGN KEY (TourID) REFERENCES Tour (TourID) ON DELETE SET NULL,
 FOREIGN KEY (UserID) REFERENCES Users (UserID) ON DELETE NO ACTION
);
drop table bookings
INSERT INTO bookings (TourID, UserID)
VALUES (1, 1),
       (2, 2),
       (3, 1);

-- Messages Table
-- CREATE TABLE Messages (
--   MessageID INT IDENTITY (1,1) PRIMARY KEY,
--   SenderID INT,
--   ReceiverID INT,
--   MessageText TEXT,
--   FOREIGN KEY (SenderID) REFERENCES Users(UserID),
--   FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
-- );
