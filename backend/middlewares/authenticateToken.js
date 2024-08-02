const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const secret = process.env.JWT_SECRET;
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;