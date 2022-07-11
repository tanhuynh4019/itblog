import mongoose, { Schema } from 'mongoose'

import IInterViewQuestion from '../interface/inter_view_question'

const interViewQuestionSchema: Schema = new Schema({
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    interview:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterView'
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    answer_good: { type: String, required: true },
    level: { type: String, default: ''},
    figure: { type: String, required: true },
    is_active: { type: Boolean, default: false},
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() }
})

export default mongoose.model<IInterViewQuestion>('InterViewQuestion', interViewQuestionSchema)