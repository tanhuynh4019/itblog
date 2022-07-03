import passport from "passport"
import express from 'express'
import multer from 'multer'

import controllerUser from "../../controller/user"
import "../../middleware/passport"
const upload = multer()

const router = express.Router()

router.post('/api/auth/register', upload.none(), controllerUser.registerUser)
router.get('/api/auth', passport.authenticate('jwt', {
    session: false
}), controllerUser.secrettUser)
router.get('/api/auth/token_redius/:token_id', controllerUser.tokenRedius)

export default router

