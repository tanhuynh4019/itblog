import mongoose, { Schema } from 'mongoose'

import IHistory from '../interface/history'

const historySchema: Schema = new Schema({
    user_id: { type: String, required: true },
    content_type: { type: String, required: true },
    history_type: { type: Number, required: true },
    history_date: { type: Date, default: Date.now() },
    post_id: { type: String },
    inter_view_id: { type: String},
    ip: { Type: String }
})

export default mongoose.model<IHistory>('History', historySchema)