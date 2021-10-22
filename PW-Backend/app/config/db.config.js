module.exports = {
    HOST: "eu-cdbr-west-01.cleardb.com",
    USER: "b6a6160d244967",
    PASSWORD: "e3d069bf",
    DB: "heroku_ca99e2492659f71",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};