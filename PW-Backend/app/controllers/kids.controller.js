const db = require("../models");
const Kids = db.kids;
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
    const kids = {
        idKids: req.body.idKids,
        brand: req.body.brand,
        name: req.body.name,
        size: req.body.size,
        noProducts: req.body.noProducts,
        price: req.body.price,
        description: req.body.description
    };

    // Save Tutorial in the database
    Kids.create(kids)
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
    Kids.findAll()
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
    const idKids = req.params.idKids;

    Kids.findByPk(idKids)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Men with id=${idKids}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Men with id=" + idKids
            });
        });
};