import { Document } from "mongoose"

export default interface IUser extends Document {
    password_hash: string
    email: string,
    role: number,
    login_type: number,
    phone: string,
    coin: number,
    ip: string,
    is_vip: boolean,
    is_active: boolean,
    is_bin: boolean,
    is_delete: boolean,
    is_email: boolean,
    email_verification_date: string,
    start_date: string,
    updated_date: string,
    login_date: string,
    vip_expiration_date: string,
    exp: number
}