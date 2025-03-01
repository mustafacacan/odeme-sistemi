const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', ''); // token yetkisi alınır

        if (!token) {
            return res.status(403).send({ message: "A token is required for authentication" }) // token yoksa hata döndür
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// token doğrulanır
        req.user = decoded   // doğrulanan token kullanıcıya atanır

        next();
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" })
    }
}

module.exports = auth;