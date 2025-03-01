const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const addressRoute = require('./router/addressRoute')
const paymentRoute = require('./router/paymentRoute')
const userRoute = require('./router/userRoute')


app
    .use('/address', addressRoute)
    .use('/payment', paymentRoute)
    .use('/user', userRoute)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server ${process.env.PORT || 5000} port is running`)
});
