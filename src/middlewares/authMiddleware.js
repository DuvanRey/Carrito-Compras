import passport from 'passport';

class Token {
    constructor() {
        this.invalidTokens = new Set();
    }

    invalidateToken(token) {
        this.invalidTokens.add(token);
    }

    isTokenInvalid(token) {
        return this.invalidTokens.has(token);
    }
}

const tokenUser = new Token();

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false, failWithError: true }, (err, user, info) => {
        if (err || !user) {
            const message = info && info.message ? info.message : 'Autenticación fallida';
            return res.status(401).json({ message })
        }
        req.user = user;
        return next();
    })(req, res, next);
};

const logoutMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token && !tokenUser.isTokenInvalid(token)) {
        tokenUser.invalidateToken(token);
        console.log('Token invalidado:', token);
    }
    next();
};

export { authMiddleware, logoutMiddleware };