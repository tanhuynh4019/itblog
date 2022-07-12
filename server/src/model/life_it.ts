import mongoose, { Schema } from 'mongoose'

import ILifeIT from '../interface/life_it'

const lifeItSchema: Schema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    view: { type: Number, default: 0 },
    tags: { type: Array },
    is_active: { type: Boolean, default: false },
    is_browser: { type: Boolean, default: false },
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug: { type: String, required: true }
})

export default mongoose.model<ILifeIT>('LifeIT', lifeItSchema)