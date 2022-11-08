module.exports = (app) => {
    const search = require("../controllers/search.controller.js");
  
    var router = require("express").Router();
  
    // Add food to order with amount 1
    router.post("/", search.addFood);
  
    // Retrieve a single post with id
    router.get("/", search.getFood);

    // // Delete a post with id
    // router.delete("/", search.delete);
  
    // // Delete all like
    // router.delete("/", search.deleteAll);
  
    app.use("/api/search", router);
};