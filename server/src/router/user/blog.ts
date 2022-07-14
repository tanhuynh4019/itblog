import passport from "passport"
import express from 'express'

import multer from "../../module/multer.module"

import controllerBlog from "../../controller/blog"
import "../../middleware/passport"

const router = express.Router()

router.post('/api/blog', passport.authenticate('jwt', {
    session: false
}), multer.uploadImage('src/uploads/blog', 'image'), controllerBlog.addBlog)

router.patch('/api/blog/:id', passport.authenticate('jwt', {
    session: false
}), multer.uploadImage('src/uploads/blog', 'image'), controllerBlog.editBlog)

router.delete('/api/blog/:id', passport.authenticate('jwt', {
    session: false
}), controllerBlog.deleteBlog)

router.get('/api/blog-slug/:slug', controllerBlog.getBySlugBlog)

router.get('/api/blog-id/:id', passport.authenticate('jwt', {
    session: false
}), controllerBlog.getByIdBlog)


router.get('/api/blog-p', controllerBlog.getBlogPublic)
export default router

