import passport from "passport"
import { Strategy } from "passport-jwt"

import config_JWT from "../config/jwt"
import userModel from "../model/user"

const {
    ExtractJwt
} = require('passport-jwt')

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: String(config_JWT.JWT_SECRET)
}, async (payload: any, done: any) => {
    try {
        const user = await userModel.findById(payload.sub)

        if (!user) return done(null, false)
        if (!user.is_active) return done(null, false)

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}))
