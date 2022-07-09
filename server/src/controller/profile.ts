import { NextFunction, Request, Response } from "express"
import itBlogProfileService from "../service/it_blog_profile"

class ITBlogProfileController {
    public async getProfile(req: Request, res: Response, next: NextFunction){
        try {
            const g_profile = await itBlogProfileService.getProfile(req.user)
            if (g_profile) {
                res.status(200).json({ status: 200, error: false, message: itBlogProfileService.getMessage(), data: g_profile })
            } else {
                res.status(400).json({ status: 400, error: true, message: itBlogProfileService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new ITBlogProfileController()