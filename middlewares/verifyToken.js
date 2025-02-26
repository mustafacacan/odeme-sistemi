const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers["authorization"] // token yetkisi alınır

    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication" }) // token yoksa hata döndür
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)  // token doğrulanır
        req.user = decoded   // doğrulanan token kullanıcıya atanır
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" })
    }

    return next()
}

module.exports = auth;