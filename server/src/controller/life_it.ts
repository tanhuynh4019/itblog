import { NextFunction, Request, Response } from "express"
import lifeITService from "../service/life_it"

class LifeITController {

    public async getPublicLifeIT(req: Request, res: Response, next: NextFunction) {
        try {
            const c_life_it = await lifeITService.get_p()
            if (c_life_it) {
                res.status(200).json({ status: 200, error: false, message: lifeITService.getMessage(), data: c_life_it })
            } else {
                res.status(400).json({ status: 400, error: true, message: lifeITService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async addLifeIT(req: Request, res: Response, next: NextFunction) {
        try {
            const c_life_it = await lifeITService.add(req.body, req.user, req.ip)
            if (c_life_it) {
                res.status(200).json({ status: 200, error: false, message: lifeITService.getMessage(), data: c_life_it })
            } else {
                res.status(400).json({ status: 400, error: true, message: lifeITService.getMessage() })
            }
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async editLifeIT(req: Request, res: Response, next: NextFunction) {
        try {
            const c_life_it = await lifeITService.edit(req.params, req.body, req.user, req.ip)
            if (c_life_it) {
                res.status(200).json({ status: 200, error: false, message: lifeITService.getMessage(), data: c_life_it })
            } else {
                res.status(400).json({ status: 400, error: true, message: lifeITService.getMessage() })
            }
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async deleteLifeIT(req: Request, res: Response, next: NextFunction) {
        try {
            const c_life_it = await lifeITService.delete(req.params, req.user, req.ip)
            if (c_life_it) {
                res.status(200).json({ status: 200, error: false, message: lifeITService.getMessage(), data: c_life_it })
            } else {
                res.status(400).json({ status: 400, error: true, message: lifeITService.getMessage() })
            }
        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async getBySlugLifeIT(req: Request, res: Response, next: NextFunction) {
        try {
            const gbs_life_it = await lifeITService.findBySlug(req.params)
            if (gbs_life_it) {
                res.status(200).json({ status: 200, error: false, message: lifeITService.getMessage(), data: gbs_life_it })
            } else {
                res.status(400).json({ status: 400, error: true, message: lifeITService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new LifeITController()