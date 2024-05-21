CREATE DATABASE LittleAngelMart
USE LittleAngelMart

CREATE TABLE Role(
    RoleID NVARCHAR(10) NOT NULL PRIMARY KEY,
    RoleName NVARCHAR(20) NOT NULL
);

CREATE TABLE UserAccount(
    UserID NVARCHAR(10) NOT NULL PRIMARY KEY,
    userName NVARCHAR(255) NOT NULL,
    userPassword NVARCHAR(255) NOT NULL,
    userEmail NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(12) NOT NULL,
    RoleID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Role(RoleID),
    Gender NVARCHAR(10) NOT NULL
);

CREATE TABLE Staff(
    staffID NVARCHAR(10) NOT NULL PRIMARY KEY,
    UserID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES UserAccount(UserID),
    hiredDate DATE NOT NULL,
    salary FLOAT NOT NULL,
    staffStatus NVARCHAR(19) NOT NULL
);

CREATE TABLE Articles(
    ArticleID NVARCHAR(10) NOT NULL PRIMARY KEY,
    UserID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES UserAccount(UserID),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL
);

CREATE TABLE Orders(
    OrderID NVARCHAR(10) NOT NULL PRIMARY KEY,
    UserID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES UserAccount(UserID),
    totalPrice FLOAT NOT NULL,
    createDate DATE NOT NULL,
    orderStatus BIT NOT NULL
);

CREATE TABLE Category(
    CategoryID NVARCHAR(10) NOT NULL PRIMARY KEY,
    categoryName NVARCHAR(255) NOT NULL
);

CREATE TABLE Voucher(
    VoucherID NVARCHAR(10) NOT NULL PRIMARY KEY,
    discount FLOAT NOT NULL,
    CreatedDate DATE NOT NULL,
    ExpiredDate DATE NOT NULL,
    VoucherStatus BIT NOT NULL
);

CREATE TABLE Product(
    ProductID NVARCHAR(10) NOT NULL PRIMARY KEY,
    CategoryID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Category(CategoryID),
    productName NVARCHAR(255) NOT NULL,
    productPrice FLOAT NOT NULL,
    productDesc NVARCHAR(255) NOT NULL,
    QuantityRemain INT NOT NULL
);

CREATE TABLE OrderDetail(
    OrderDetailID NVARCHAR(10) NOT NULL PRIMARY KEY,
    ProductID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Product(ProductID),
    OrderID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Orders(OrderID),
    VoucherID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Voucher(VoucherID),
    quantity INT NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE Payment(
    PaymentID NVARCHAR(10) NOT NULL PRIMARY KEY,
    OrderID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Orders(OrderID),
    paymentDate DATE NOT NULL,
    paymentMethod NVARCHAR(100) NOT NULL,
    amountPaid FLOAT NOT NULL,
    accountNo nvarchar(15) NOT NULL
);

CREATE TABLE Feedback(
    FeedbackID NVARCHAR(12) NOT NULL PRIMARY KEY,
    UserID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES UserAccount(UserID),
    ProductID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Product(ProductID),
    Comment NVARCHAR(MAX) NOT NULL,
);

CREATE TABLE FeedbackRating(
	FeedbackID NVARCHAR(12) NOT NULL FOREIGN KEY REFERENCES Feedback(FeedbackID),
	Rating FLOAT NOT NULL
);

CREATE TABLE PreOrders(
    PreOrdersID NVARCHAR(10) NOT NULL PRIMARY KEY,
    ProductID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Product(ProductID),
    UserID NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES UserAccount(UserID),
    Quantity INT NOT NULL,
    OrderDate DATE NOT NULL
);

ALTER TABLE UserAccount DROP COLUMN gender
ALTER TABLE UserAccount ADD UNIQUE(userEmail)
