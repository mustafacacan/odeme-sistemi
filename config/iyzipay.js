const iyzipay = require("iyzipay");

const iyzipayInstance = new iyzico({
    apiKey
        : process.env.IYZIPAY_API_KEY,
    secret
        : process.env.IYZIPAY_SECRET_KEY,
    uri
        : process.env.IYZIPAY_BASE_URL
});

module.exports = iyzipayInstance;