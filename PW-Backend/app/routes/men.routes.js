module.exports = app => {
    const men = require("../controllers/men.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", men.create);

    // Retrieve all Tutorials
    router.get("/", men.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:idMen", men.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/men', router);
};