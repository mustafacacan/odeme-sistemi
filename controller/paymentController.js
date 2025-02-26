const paymentService = require('../services/paymentService');

const startPayment = async (req, res) => {
    try {
        const { addressId, amount } = req.body;  // adres id'si ve miktarı al
        const userId = req.user.id;  // kullanıcı id'si

        const result = await paymentService.startPayment(userId, addressId, amount); // ödeme işlemini başlat
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const checkPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const result = await paymentService.checkPaymentStatus(orderId);  // ödeme durumunu kontrol et
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    startPayment,
    checkPaymentStatus
}