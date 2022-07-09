import mongoose, { Schema } from 'mongoose'

import IInterView from '../interface/inter_view'

const interViewSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: Object, required: true},
    description: { type: String, required: true},
    content: { type: String, required: true},
    view: { type: Number, required: true, default: 0},
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_active: { type: Boolean, required: false},
    is_browser: { type: Boolean, required: false},
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
    slug: { type: String, required: false}
}) 

export default mongoose.model<IInterView>('InterView', interViewSchema)