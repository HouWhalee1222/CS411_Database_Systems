module.exports = (app) => {
    const searchOrder = require("../controllers/searchOrder.controller.js");

    var router = require("express").Router();

    // // Create a new post
    // router.post("/", search.create);

    // Retrieve all like
    // router.get("/", search.findAll);

    // Retrieve a single post with id
    router.get("/", searchOrder.getOrder);

    // // Delete a post with id
    // router.delete("/", search.delete);

    // // Delete all like
    // router.delete("/", search.deleteAll);

    app.use("/api/searchOrder", router);
};