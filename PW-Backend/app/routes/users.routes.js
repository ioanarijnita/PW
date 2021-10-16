module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", users.create);

    router.post("/user", users.login);

    // Retrieve all Tutorials
    router.get("/", users.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:username", users.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/users', router);
};