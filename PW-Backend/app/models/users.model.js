module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    });

    return Users;
};