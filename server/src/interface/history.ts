import { Document } from "mongoose"

export default interface IHistory extends Document {
    user_id: string
    content_type: string
    history_type: string
    history_date : string
    post_id?: string
}