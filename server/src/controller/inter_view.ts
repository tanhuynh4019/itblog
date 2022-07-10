import { NextFunction, Request, Response } from "express"
import interViewService from "../service/inter_view"

class InterViewController {
    
    public async addInterView(req: Request, res: Response, next: NextFunction){
        try {
            const c_inter_view = await interViewService.add(req.body, req.file, req.user, req.ip)
            if (c_inter_view) {
                res.status(200).json({ status: 200, error: false, message: interViewService.getMessage(), data: c_inter_view })
            } else {
                res.status(400).json({ status: 400, error: true, message: interViewService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async getInterView(req: Request, res: Response, next: NextFunction){
        try {
            const g_inter_view = await interViewService.findBySlug(req.params, req.user)
            if (g_inter_view) {
                res.status(200).json({ status: 200, error: false, message: interViewService.getMessage(), data: g_inter_view })
            } else {
                res.status(400).json({ status: 400, error: true, message: interViewService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new InterViewController()