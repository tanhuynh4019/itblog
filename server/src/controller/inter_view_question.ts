import { NextFunction, Request, Response } from "express"
import interViewQuestionService from "../service/inter_view_question"

class InterViewQuestionController {
    
    public async addInterViewQuestion(req: Request, res: Response, next: NextFunction){
        try {
            const c_inter_view_question = await interViewQuestionService.add(req.body, req.user, req.ip)
            if (c_inter_view_question) {
                res.status(200).json({ status: 200, error: false, message: interViewQuestionService.getMessage(), data: c_inter_view_question })
            } else {
                res.status(400).json({ status: 400, error: true, message: interViewQuestionService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async getByIdToInterViewQuestion(req: Request, res: Response, next: NextFunction){
        try {
            const gbtiv_inter_view_question = await interViewQuestionService.getByIdToInterView(req.params, req.user)
            if (gbtiv_inter_view_question) {
                res.status(200).json({ status: 200, error: false, message: interViewQuestionService.getMessage(), data: gbtiv_inter_view_question })
            } else {
                res.status(400).json({ status: 400, error: true, message: interViewQuestionService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new InterViewQuestionController()