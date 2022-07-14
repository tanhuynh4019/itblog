import mongoose, { Schema } from 'mongoose'

import IBlog from '../interface/blog'

const blogSchema: Schema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true},
    image: { type: Object, required: true},
    view: { type: Number, required: true, default: 0},
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_active: { type: Boolean, required: false, default: true},
    is_browser: { type: Boolean, required: false},
    create_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
    slug: { type: String, required: false },
    tags: { type: Object, required: false },
    categorys: {type: Number, required: true},
})

export default mongoose.model<IBlog>('Blog', blogSchema)