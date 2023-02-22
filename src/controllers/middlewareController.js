import jwt from 'jsonwebtoken';

export const middlewareController = {
    verifyToken:(req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_KEY_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        code: 3,
                        message: 'Token is invalid!!!'
                    })
                };
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json({
                code: 3,
                message: 'You are not authenticated ! ! !'
            });
        }
    },
}
