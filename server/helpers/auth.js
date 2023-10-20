const JWT = require('jsonwebtoken');

const SECRET = process.env.SECRET;

function verifyToken(req) {
    const TOKEN = req.headers.authorization.split(' ')[1];

    return new Promise((resolve, reject) => {
        JWT.verify(TOKEN, SECRET, (err, decoded) => {
            if (err) {
                console.log('token decode err',err)
                reject();
            }

            req.user = decoded.sub;
            resolve();
        });
    });
}



module.exports = {
    isAuth: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'You need to be logged in to access this!'
            });
        }

        verifyToken(req).then(() => {
            next();
        }).catch(() => {
            return res.status(401).json({
                message: 'Token verification failed!'
            });
        });
    }
}