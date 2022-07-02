import passport from "passport"
import express from 'express'
import multer from 'multer'

import controllerUser from "../../controller/user"
const upload = multer()


const router = express.Router()

router.post('/api/auth/register', upload.none(), controllerUser.registerUser)

export default router
