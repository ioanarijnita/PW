const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// const bcrypt = require('bcryptjs')
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    // bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        region: req.body.region,
        address: req.body.address
    };

    // Save Tutorial in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.login = async(req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) return res.json({ msg: `No account with this email found` })
    const doesPasswordMatch = bcrypt.compareSync(req.body.password, existingUser.password);
    if (!doesPasswordMatch) return res.json({ msg: `Passwords did not match` });

    res.json(existingUser);
    // const user = {
    //     username: req.body.username,
    //     password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
    // };

    // Save Tutorial in the database
    // User.create(user)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the Tutorial."
    //         });
    //     });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // check this
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// // Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const username = req.params.username;

    User.findByPk(username)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with username=${username}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with username=" + username
            });
        });
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {

// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {

// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {

// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {

// };