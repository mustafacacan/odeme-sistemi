const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, // ödeme yapılacak adres
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, // iyzico'dan dönen conversation id
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    }, // ödeme yapılacak fiyat
    paidPrice: {
        type: DataTypes.DATE,
        allowNull: false,
    },// ödeme yapılan fiyat
    iyzicoPaymentId: {
        type: DataTypes.STRING
    }, // iyzico'dan gelen payment id
    iyzicoRawData: {
        type: DataTypes.JSON
    } // burada iyzico'dan gelen raw data'yı saklayacağız
});

module.exports = Payment;