import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { User } from '../models/User.js';
import { config } from './config.js';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findByPk(payload.sub);
        if (!user) {
            // return errorResponse(null, "token invalido", 401);
            return { message: 'token invalido' };
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
