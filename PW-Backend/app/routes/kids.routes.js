module.exports = app => {
    const kids = require("../controllers/kids.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", kids.create);

    // Retrieve all Tutorials
    router.get("/", kids.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:idKids", kids.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/kids', router);
};