import { Document } from "mongoose"

export default interface IInterViewQuestion extends Document {
    user_auth: any,
    interview:  any,
    question: string,
    answer: string,
    answer_good: string,
    level: string,
    figure: string,
    is_active: boolean,
    create_date: string,
    update_date: string
}