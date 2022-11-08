module.exports = (app) => {
    const popular = require("../controllers/popular.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new post
    // router.post("/", search.create);
  
    // Retrieve all like
    // router.get("/", search.findAll);
  
    // Retrieve a single post with id
    router.get("/", popular.getPopular);

    // // Delete a post with id
    // router.delete("/", search.delete);
  
    // // Delete all like
    // router.delete("/", search.deleteAll);
  
    app.use("/api/popular", router);
};