import { Document } from "mongoose"

export default interface IInterView extends Document {
    name: string,
    image: any,
    description: string,
    content: string,
    view: number,
    user_auth: any,
    is_active: boolean,
    is_browser: boolean,
    create_date: string,
    update_date: string,
}