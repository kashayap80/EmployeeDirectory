CREATE DATABASE Employee_Directory;

USE Employee_Directory;

CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

CREATE TABLE Employee(
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber VARCHAR(15),
    DOJ DATE,
    Designation VARCHAR(50),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Admin (
    AdminID INT PRIMARY KEY,
    Username VARCHAR(50),
    Password VARCHAR(50)
);


INSERT INTO Department (DepartmentID, DepartmentName) VALUES
(1, 'Human Resources'),
(2, 'Finance'),
(3, 'IT'),
(4, 'Marketing');

Select * from DEpartment;

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, PhoneNumber, DOJ, Designation, DepartmentID) VALUES
(2395520, 'Anish', 'Singh', 'anish.singh@cognizant.com', '1234567890', '2025-01-15', 'Trainee', 1),
(2395615, 'Nishita', 'Deo', 'nishita.deo@cognizant.com', '0987654321', '2025-02-20', 'Manager', 2),
(2395580, 'Aakanksha', 'Kashyap', 'aakanksha.kashyap@cognizant.com', '1122334455', '2024-03-10', 'Trainee', 4),
(2395531, 'Abhishek', 'Kumar', 'abhisheke.kumar@cognizant.com', '5566778899', '2024-07-25', 'Designer', 4),
(2395581, 'Dhanjee', 'Tiwari', 'dhanjee.tiwari@cognizant.com', '5566778899', '2024-07-04', 'Developer', 3);

Select * from Employee;


INSERT INTO Admin (AdminID, Username, Password) VALUES
(1, 'admin', 'password123');


Select * from Admin;



