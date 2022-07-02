import jwt from 'jsonwebtoken'

const {
    JWT_SECRET
} = require('../config/jwt')

class JWT {
    private exp: number = new Date().setDate(new Date().getDate() + 3)
    private iat: number = new Date().getTime()

    public async endcodedToken(employerID: string) {
        return jwt.sign({
            sub: employerID,
            iat: this.iat,
            exp: this.exp
        }, JWT_SECRET)
    }
}

export default new JWT()