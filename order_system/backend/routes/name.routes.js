module.exports = (app) => {
    const name = require("../controllers/name.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single post with id
    router.get("/", name.getName);

    // // Delete a post with id
    // router.delete("/", search.delete);
  
    // // Delete all like
    // router.delete("/", search.deleteAll);
  
    app.use("/api/name", router);
};