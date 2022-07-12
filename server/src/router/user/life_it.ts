import passport from "passport"
import express from 'express'

import multer from "../../module/multer.module"

import controllerLifeIT from "../../controller/life_it"
import "../../middleware/passport"

const router = express.Router()

router.get('/api/life-it-p', controllerLifeIT.getPublicLifeIT)
router.post('/api/life-it', passport.authenticate('jwt', {
    session: false
}), multer.uploadNone(), controllerLifeIT.addLifeIT)
router.patch('/api/life-it-edit/:id', passport.authenticate('jwt', {
    session: false
}), multer.uploadNone(), controllerLifeIT.editLifeIT)
router.delete('/api/life-it-delete/:id', passport.authenticate('jwt', {
    session: false
}), multer.uploadNone(), controllerLifeIT.deleteLifeIT)
router.get('/api/life-it-slug/:slug', controllerLifeIT.getBySlugLifeIT)

export default router