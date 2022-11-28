module.exports = (app) => {
    const register = require("../controllers/register.controller.js");

    var router = require("express").Router();

    // Registration submission
    router.post("/", register.submit);

    app.use("/api/register", router);
};