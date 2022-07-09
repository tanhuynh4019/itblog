import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import e_ROLE from '../common/role.enum'
import e_TYPELOGIN from '../common/type_login.enum'

import IITBlogProfile from '../interface/it_blog_profile'

const itBlogProfileSchema: Schema = new Schema({
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    about_me: { type: String, default: ''},
    first_name: { type: String, default: ''},
    last_name: { type: String, default: ''},
    birthday: { type: String, default: ''},
    interests: { type: String, default: ''},
    phone: { type: String, default: ''},
    email: { type: String, default: ''},
    link_facebook: { type: String, default: ''},
    link_linkedln: { type: String, default: ''},
    profile_photo: { type: Object, default: {filename: 'profile.png'}},
    backgroud_photo: { type: Object, default: {filename: 'backgroud.png'}},
    additional_name: { type: String, default: ''},
    headline: { type: String, default: ''},
    address: { type: String, default: ''},
    country: { type: String, default: ''},
    city: { type: String, default: ''},
    profile_name: { type: String, required: true},
    type_eye: { type: Number, default: 0}
})

export default mongoose.model<IITBlogProfile>('ItBlogProfile', itBlogProfileSchema)