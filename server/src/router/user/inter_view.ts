import passport from "passport"
import express from 'express'

import multer from "../../module/multer.module"

import controllerInterView from "../../controller/inter_view"
import "../../middleware/passport"

const router = express.Router()

router.post('/api/inter-view', passport.authenticate('jwt', {
    session: false
}), multer.uploadImage('src/uploads/inter_view', 'image'), controllerInterView.addInterView)

router.patch('/api/inter-view/:id', passport.authenticate('jwt', {
    session: false
}), multer.uploadImage('src/uploads/inter_view', 'image'), controllerInterView.editInterView)

router.get('/api/inter-view/:slug', passport.authenticate('jwt', {
    session: false
}), controllerInterView.getBySlugInterView)

router.get('/api/inter-view-id/:id', passport.authenticate('jwt', {
    session: false
}), controllerInterView.getByIdInterView)

router.get('/api/inter-view-p', controllerInterView.getInterViewPublic)
router.get('/api/inter-view-auth',passport.authenticate('jwt', {
    session: false
}), controllerInterView.getInterViewAuth)

export default router

