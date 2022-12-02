module.exports = (app) => {
    const login = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", login.getLoginId);
  
    app.use("/api/login", router);
};