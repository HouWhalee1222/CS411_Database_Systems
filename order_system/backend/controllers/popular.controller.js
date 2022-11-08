const db = require('../db');

exports.getPopular = (req, res) => {
    // Select the most popular 10 food
    const sqlCommand = `SELECT d.DishId, d.DishName, d.Price, d.Description
    FROM Customers c JOIN Dishes d ON c.FavoriteFood = d.DishId JOIN
    (SELECT DishId, COUNT(IngredientId) as Ingredient_Count FROM Recipes GROUP BY DishId) as t ON c.FavoriteFood = t.DishId
    GROUP BY c.FavoriteFood
    ORDER BY COUNT(FavoriteFood) DESC, d.Price, d.DishName, Ingredient_Count LIMIT 10`;
    console.log(sqlCommand);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });
};
