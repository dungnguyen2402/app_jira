const jwt = require('jsonwebtoken');

module.exports = {
    checkPermission : async function (req, res, next) {
        try {
            const token = req.hearders.authorization.split(' ')[1];
            jwt.verify(token , '123456', async(error, payload) => {
                if (error.name === 'JsonWebTokenError') {
                    return res.status(400).json({
                        message: "Token không hợp lệ"
                    })
                }
                if (error.name == 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Token hết hạn"
                    })
                }
                req.user = user,
                next()
            })
        } catch (error) {
            
        }
    },
}