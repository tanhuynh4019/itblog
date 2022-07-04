import passport from "passport"
import { Strategy } from "passport-jwt"
import localStrategy from "passport-local"
import bcryptModule from '../module/bcrypt.module'

import config_JWT from "../config/jwt"
import userModel from "../model/user"

const {
    ExtractJwt
} = require('passport-jwt')

const l_Strategy = localStrategy.Strategy

passport.use(new l_Strategy({
    usernameField: 'email'
}, async(email: string, password: string, done) => {
    try {
        const user = await userModel.findOne({
            email
        })
        if (!user) return done(null, false)
        
        const isCorrectPassword = await bcryptModule.comparePassword(password, user.password_hash)
        if (!isCorrectPassword) return done(null, false)
        console.log(user);
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

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


