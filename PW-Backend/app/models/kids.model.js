module.exports = (sequelize, Sequelize) => {
    const Kids = sequelize.define("kids", {
        idKids: {
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

    return Kids;
};