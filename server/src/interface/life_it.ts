import { Document } from "mongoose"

export default interface ILifeIT extends Document {
    name: string
    content: string
    view: number
    tags: any
    is_active: boolean
    is_browser: boolean
    create_date: string
    update_date: string
    user_auth: string,
    slug: string
}