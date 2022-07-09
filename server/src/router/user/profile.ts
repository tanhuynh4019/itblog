import passport from "passport"
import express from 'express'
import multer from 'multer'

import controllerProfile from "../../controller/profile"
import "../../middleware/passport"
const upload = multer()

const router = express.Router()

router.get('/api/profile', upload.none(), passport.authenticate('jwt', {
    session: false
}), controllerProfile.getProfile)

export default router

