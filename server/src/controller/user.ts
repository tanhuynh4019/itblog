import { NextFunction, Request, Response } from "express"
import userService from "../service/user"

class UserController {
    public async registerUser(req: Request, res: Response, next: NextFunction){
        try {
            const c_user = await userService.register(req.body, req.ip)
            if (c_user) {
                res.status(200).json({ status: 200, error: false, message: userService.getMessage(), data: c_user })
            } else {
                res.status(400).json({ status: 400, error: true, message: userService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async secrettUser(req: Request, res: Response, next: NextFunction){
        console.log(req.user)
        res.status(200).json({
            user: req.user
        })
    }

    public async tokenRedius(req: Request, res: Response, next: NextFunction){
        try {
            const c_token = await userService.tokenRedius(req.params)
            if (c_token) {
                res.status(200).json({ status: 200, error: false, message: userService.getMessage(), data: c_token })
            } else {
                res.status(400).json({ status: 400, error: true, message: userService.getMessage() })
            }
       
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new UserController()