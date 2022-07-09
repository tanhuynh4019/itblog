import { Document } from "mongoose"

export default interface IITBlogProfile extends Document {
    user_auth: string,
    about_me: string,
    first_name: string,
    last_name: string,
    birthday: string,
    interests: string,
    phone: string,
    email: string,
    link_facebook: string,
    link_linkedln: string,
    profile_photo: string,
    backgroud_photo: string,
    additional_name: string,
    headline: string,
    address: string,
    country: string,
    city: string,
    profile_name: string,
    type_eye: number,
}