module.exports = (sequelize, Sequelize) => {
    const Women = sequelize.define("women", {
        id: {
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
        },
        gender: {
            type: Sequelize.INTEGER
        },
        imageName: {
            type: Sequelize.STRING
        }
    });

    return Women;
};