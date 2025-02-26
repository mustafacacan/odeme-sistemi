const iyzipay = require('../config/iyzipay');
const crypto = require('crypto');
const { Payment, User, Address } = require('../models');
const { v4: uuidv4 } = require('uuid');


const startPayment = async (userId, addressId, amount) => {
    const user = await User.findByPk(userId);   // kullanıcıyı bul
    const address = await Address.findByPk(addressId);  // adresi bul


    if (!user || !address) {
        return { message: "User or address not found" }; // kullanıcı veya adres bulunamadı
    }


    const orderId = `ORDER_${uuidv4()}`; // ödeme id'si oluştur

    const paymentRequest = {
        locale: "tr",
        conversationId: orderId,
        price: amount,
        paidPrice: amount,
        currency: "TRY",
        installment: 1,
        basketId: orderId,
        paymentChannel: "WEB",
        paymentGroup: "PRODUCT",
        paymentCard: {},
        buyer: {
            id: user.id,
            name: user.fullName,
            surname: user.fullName,
            email: user.email,
            identityNumber: "11111111111",
            registrationAddress: user.address,
            city: address.city,
            country: "Turkey",
            zipCode: address.zipCode || "00000",
        },
        shippingAddress: {
            contactName: user.fullName,
            city: address.city,
            country: "Turkey",
            address: address.address,
            zipCode: address.zipCode || "00000",
        },
        billingAddress: {
            contactName: user.fullName,
            city: address.city,
            country: "Turkey",
            address: address.address,
            zipCode: address.zipCode || "00000",
        },
        paymentCard: {
            cardHolderName: user.fullName,
            cardNumber: "5890040000000016",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "0",
        },
        basketItems: [
            {
                id: orderId,
                name: "Payment",
                category1: "Payment",
                itemType: "PHYSICAL",
                price: amount,
            },
        ]
    };


    const paymentResponse = await new Promise((resolve, reject) => {
        iyzipay.payment.create(paymentRequest, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

    if (paymentResponse.status !== 'success') {
        return { message: paymentResponse.errorMessage };
    }

    const payment = await Payment.create({
        userId,
        addressId,
        conversationId: paymentResponse.conversationId,
        price: amount,
        paidPrice: amount,
        iyzicoPaymentId: paymentResponse.paymentId,
        iyzicoRawData: paymentResponse
    });

    return { message: "payment successful", payment };
}

const checkPaymentStatus = async (orderId) => {
    const payment = await Payment.findOne({ where: { orderId } });
    if (!payment) {
        return { message: "Payment not found" };
    }

    return { orderId, status: payment.status };
}

module.exports = {
    startPayment,
    checkPaymentStatus
}