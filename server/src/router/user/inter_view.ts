import passport from "passport"
import express from 'express'

import multer from "../../module/multer.module"

import controllerInterView from "../../controller/inter_view"
import "../../middleware/passport"

const router = express.Router()

router.post('/api/inter-view', passport.authenticate('jwt', {
    session: false
}), multer.uploadImage('src/uploads/inter_view', 'image'), controllerInterView.addInterView)

router.get('/api/inter-view/:slug', passport.authenticate('jwt', {
    session: false
}), controllerInterView.getInterView)

export default router

