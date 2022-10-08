CREATE TABLE Customers(
    CustomerId INT PRIMARY KEY NOT NULL,
    Password VARCHAR(32) NOT NULL,
    Name VARCHAR(32) NOT NULL,
    Phone VARCHAR(16) DEFAULT NULL,
    FavoriteFood INT,
    FOREIGN KEY (FavoriteFood) REFERENCES Dishes(DishId) ON DELETE SET NULL

);

CREATE TABLE Orders(
    OrderId INT PRIMARY KEY NOT NULL,
    StartTime DATETIME NOT NULL, 
    FinishTime DATETIME DEFAULT NULL, 
    TotalPrice REAL NOT NULL, 
    CustomerId INT NOT NULL,
    SeatingId INT NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId) ON DELETE SET NULL
    FOREIGN KEY (SeatingId) REFERENCES Seatings(SeatingId) ON DELETE SET NULL
);

CREATE TABLE Dishes(
    DishId INT PRIMARY KEY NOT NULL,
    DishName VARCHAR(32) NOT NULL, 
    Price REAL NOT NULL, 
    ImageUrl VARCHAR(256), 
    Description VARCHAR(256)
);

CREATE TABLE Ingredients(
    IngredientId INT PRIMARY KEY NOT NULL, 
    IngredientName VARCHAR(32) NOT NULL, 
    Amount INT NOT NULL
);

CREATE TABLE Seatings(
    SeatingId INT PRIMARY KEY NOT NULL, 
    Capacity INT NOT NULL, 
    Occupied BOOLEAN
);

CREATE TABLE Recipes(
    DishId INT, 
    IngredientId INT,
    PRIMARY KEY (DishId, IngredientId),
    FOREIGN KEY (DishId) REFERENCES Dishes(DishId) ON DELETE CASCADE
    FOREIGN KEY (IngredientId) REFERENCES Ingredients(IngredientId) ON DELETE SET NULL
);

CREATE TABLE OrderDishes(
    OrderId INT, 
    DishId INT, 
    Amount INT,
    PRIMARY KEY (OrderId, DishId)
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE
    FOREIGN KEY (DishId) REFERENCES Dishes(DishId) ON DELETE SET NULL
);
