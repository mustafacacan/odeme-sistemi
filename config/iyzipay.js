const iyzipay = require("iyzipay");

const iyzipayInstance = new iyzipay({
    apiKey
        : process.env.IYZIPAY_API_KEY,
    secret
        : process.env.IYZIPAY_SECRET_KEY,
    uri
        : "https://sandbox-api.iyzipay.com"
});

module.exports = iyzipayInstance;