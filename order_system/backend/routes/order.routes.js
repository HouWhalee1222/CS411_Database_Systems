module.exports = (app) => {
    const order = require("../controllers/order.controller.js");

    var router = require("express").Router();

    // Retrieve a order
    router.get("/search", order.getOrder);

    // Add a dish
    router.get("/add", order.addDish);

    // Minus a dish, delete a dish if necessary
    router.get("/minus", order.minusDish);

    // Delete a dish
    router.get("/delete", order.deleteDish);

    // Checkout a order
    router.get("/checkout", order.checkoutOrder);

    app.use("/api/order", router);
};