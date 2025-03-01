const jwt = require("jsonwebtoken")
const secret = "the secret key"

module.exports.secret = secret

module.exports.authenticate = (req, res, next) =>{
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(400).json({verified: false})
        }else{
            next()
        }
    })
}