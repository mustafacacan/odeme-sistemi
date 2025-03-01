// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: "postgres"
// });

// sequelize.authenticate().then(() => {
//     sequelize.sync({ force: true });
//     console.log("Connection has been established successfully.");
// }
// ).catch((error) => {
//     console.error("Unable to connect to the database:", error);
// }
// );

// module.exports = sequelize;


const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("iyzico", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
}
).catch((error) => {
    console.error("Unable to connect to the database:", error);
}
);

module.exports = sequelize;