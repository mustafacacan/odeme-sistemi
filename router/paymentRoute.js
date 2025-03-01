const express = require('express')
const router = express.Router()
const paymentController = require('../controller/paymentController')
const auth = require('../middlewares/verifyToken')


router
    .post("/start", auth, paymentController.startPayment)
    .get("/status/:orderId", auth, paymentController.checkPaymentStatus)


module.exports = router