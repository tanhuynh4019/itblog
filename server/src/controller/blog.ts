import { NextFunction, Request, Response } from "express"
import blogService from "../service/blog"

class BlogController {
    
    public async addBlog(req: Request, res: Response, next: NextFunction){
        try {
            const c_blog = await blogService.add(req.body, req.file, req.user, req.ip)
            if (c_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: c_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async editBlog(req: Request, res: Response, next: NextFunction){
        try {
            const e_blog = await blogService.edit(req.params, req.body, req.file, req.user, req.ip)
            if (e_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: e_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async deleteBlog(req: Request, res: Response, next: NextFunction){
        try {
            const d_blog = await blogService.delete(req.params)
            if (d_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: d_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }


    public async getBySlugBlog(req: Request, res: Response, next: NextFunction){
        try {
            const gbs_blog = await blogService.findBySlug(req.params)
            if (gbs_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: gbs_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async getByIdBlog(req: Request, res: Response, next: NextFunction){ 
        try {
            const g_blog = await blogService.getByID(req.params, req.user)
            if (g_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: g_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async getBlogPublic(req: Request, res: Response, next: NextFunction){
        try {
            const g_blog = await blogService.getBlog_public()
            if (g_blog) {
                res.status(200).json({ status: 200, error: false, message: blogService.getMessage(), data: g_blog })
            } else {
                res.status(400).json({ status: 400, error: true, message: blogService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new BlogController()