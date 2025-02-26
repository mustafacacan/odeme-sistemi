const express = require('express')
const router = express.Router()
const paymentController = require('../controller/paymentController')
const auth = require('../middleware/auth')


router
    .post("/start", auth, paymentController.startPayment)
    .get("/status/:orderId", auth, paymentController.checkPaymentStatus)


module.exports = router