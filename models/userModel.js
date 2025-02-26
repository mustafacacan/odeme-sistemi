const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10); // saltı oluştur
    user.passwordSalt = salt; // saltı kullanıcıya ekle
    user.password = await bcrypt.hash(user.password, salt); // şifreyi hashle
}
);

User.updatePassword = async (id, password) => {
    if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10); // saltı oluştur
        user.passwordSalt = salt;  // saltı kullanıcıya ekle
        user.password = await bcrypt.hash(user.password, salt);  // şifreyi hashle
    }
}

module.exports = User;