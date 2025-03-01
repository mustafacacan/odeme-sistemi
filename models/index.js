const User = require("./userModel")();
const Payment = require("./paymentModel");
const Address = require("./addressModel");

User.hasMany(Address, { foreignKey: "userId" }); // kullanıcı bir çok adrese sahip olabilir ve kullanıcı silindiğinde adresler de silinir
Address.belongsTo(User, { foreignKey: "userId" }); // adres bir kullanıcıya ait olmalı

User.hasMany(Payment, { foreignKey: "userId" }); // kullanıcı bir çok ödeme yapabilir ve kullanıcı silindiğinde ödemeler null olur
Payment.belongsTo(User, { foreignKey: "userId" }); // ödeme bir kullanıcıya ait olmalı

Address.hasMany(Payment, { foreignKey: "addressId" }); // adres bir çok ödeme yapabilir ve adres silindiğinde ödemeler null olur
Payment.belongsTo(Address, { foreignKey: "addressId" }); // ödeme bir adrese ait olmalı

module.exports = { User, Payment, Address };