module.exports = (app) => {
    const modifyOrder = require("../controllers/modifyOrder.controller.js");

    var router = require("express").Router();

    // // Create a new post
    // router.post("/", search.create);

    // Retrieve all like
    // router.get("/", search.findAll);

    // Retrieve a single post with id
    router.get("/add", modifyOrder.addDish);

    // Retrieve a single post with id
    router.get("/minus", modifyOrder.minusDish);

    // Retrieve a single post with id
    router.get("/delete", modifyOrder.deleteDish);

    // // Delete a post with id
    // router.delete("/", search.delete);

    // // Delete all like
    // router.delete("/", search.deleteAll);

    app.use("/api/modifyOrder", router);
};