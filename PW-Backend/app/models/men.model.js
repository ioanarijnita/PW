module.exports = (sequelize, Sequelize) => {
    const Men = sequelize.define("men", {
        idMen: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        brand: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        size: {
            type: Sequelize.STRING
        },
        noProducts: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Men;
};