import passport from "passport"
import express from 'express'

import multer from "../../module/multer.module"

import controllerInterViewQuestion from "../../controller/inter_view_question"
import "../../middleware/passport"

const router = express.Router()

router.post('/api/inter-view-question', multer.uploadNone(), passport.authenticate('jwt', {
    session: false
}), controllerInterViewQuestion.addInterViewQuestion)

export default router

