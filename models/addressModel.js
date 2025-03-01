const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Address = sequelize.define("Address", {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buildingNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doorNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressType: {
        type: DataTypes.ENUM("home", "work", "other"),
        allowNull: false,
    }
});

module.exports = Address;