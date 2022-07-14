import { Document } from "mongoose"

export default interface IBlog extends Document {
    name: string,
    content: string,
    description: string,
    image: any,
    view: number,
    user_auth: any,
    is_active: boolean,
    is_browser: boolean,
    create_date: string,
    update_date: string,
    tags: any,
    categorys: number,
}