import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import e_ROLE from '../common/role.enum'
import e_TYPELOGIN from '../common/type_login.enum'

import IUser from '../interface/user'

const userSchema: Schema = new Schema({
    password_hash: { type: String, required: true },
    email: { type: String, unique: true, required: true, validate: validator.isEmail },
    role: { type: Number, required: true, default: e_ROLE.USER, enum: [e_ROLE.USER, e_ROLE.EDITOR, e_ROLE.ADMIN, e_ROLE.SUPERADMIN] },
    login_type: { type: Number, required: true, default: e_TYPELOGIN.DEFAULT, enum: [e_TYPELOGIN.DEFAULT, e_TYPELOGIN.FACEBOOK, e_TYPELOGIN.GOOGLE, e_TYPELOGIN.ZALO, e_TYPELOGIN.GITHUB] },
    phone: { type: Number },
    coin: { type: Number, default: 0 },
    ip: { type: String, required: true },
    is_vip: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    is_bin: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    is_email: { type: Boolean, default: false },
    email_verification_date: { type: Date },
    start_date: { type: Date, default: Date.now() },
    updated_date: { type: Date, default: null },
    login_date: { type: Date, default: Date.now() },
    vip_expiration_date: { type: Date, default: null },
    exp: { type: Number, default: 0 },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItBlogProfile'
    },

})

export default mongoose.model<IUser>('User', userSchema)