module.exports = app => {
    const women = require("../controllers/women.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", women.create);

    // Retrieve all Tutorials
    router.get("/", women.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", women.findOne);

    // Update a Tutorial with id
    router.put("/:id", women.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/women', router);
};