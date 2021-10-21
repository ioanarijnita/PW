const db = require("../models");
const Women = db.women;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.brand) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const women = {
        id: req.body.id,
        brand: req.body.brand,
        name: req.body.name,
        size: req.body.size,
        noProducts: req.body.noProducts,
        price: req.body.price,
        description: req.body.description,
        gender: req.body.gender,
        imageName: req.body.imageName
    };

    // Save Tutorial in the database
    Women.create(women)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const brand = req.query.brand;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // check this
    Women.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Women.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Women with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Women with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Women.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Women was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Women with id=${id}. Maybe Women was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Women with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Women.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Women was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Women with id=${id}. Maybe Women was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Women with id=" + id
            });
        });
};