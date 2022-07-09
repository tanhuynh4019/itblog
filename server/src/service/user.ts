import { createClient } from "redis"
import bcryptModule from '../module/bcrypt.module'
import jwtModule from '../module/jwt.module'

import userModel from '../model/user'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'

import historyService from '../service/history'
import itBlogProfile from '../service/it_blog_profile'

const redis_client = createClient()
redis_client.connect()

class UserService {
    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async register(body: any, ip: string) {
        try {

            const { password, email } = body
            const hashPassword = await bcryptModule.hashPassword(password)

            if (!hashPassword) {
                this.setMessage('Lỗi mật khẩu, vui lòng khử lại!')
                return false
            }

            body.ip = ip
            body.password_hash = hashPassword

            const exist_user = await userModel.findOne({ email })
            if (exist_user) {
                this.setMessage('E-mail đã được sử dụng, vui lòng chọn tài khoản khác hoặc quên mật khẩu!')
                return false
            }

            const c_user = await userModel.create(body)

            const token = await jwtModule.endcodedToken(c_user._id)
            if (!token) {
                this.setMessage('Đã đăng ký thành công, vui lòng đăng nhập!')
                return false
            }

            const c_history = await historyService.add(c_user._id, e_ActiveType.REGISTER, e_HistoryType.ACCESS)
            if (!c_history) {
                this.setMessage('Đã đăng ký thành công, vì một số vấn đề nên vui lòng xác minh E-mail!')
                return false
            }

            const c_profile = await itBlogProfile.add_new_contructor(c_user._id,  c_user.email.replace(/@(\D*)/, ''))
            if(!c_profile){
                this.setMessage('Đã đăng ký nhưng lỗi xác thực thông tin, hãy đăng nhập và xác nhận email!')
                return false
            }


            this.setMessage('Đăng ký tài khoản ITBlog thành công!')
            await redis_client.set(this.random, token)

            return { token_id: this.random, username: c_user.email.replace(/@(\D*)/, '') }

        } catch (error: any) {
            this.setMessage(error.message)
            return false
        }
    }

    public async login(user: any, ip: string) {
        try {
            const token = await jwtModule.endcodedToken(user._id)
            if (!token) {
                this.setMessage('Lỗi kết nối, Vui lòng thử lại sau!')
                return false
            }

            const c_history = await historyService.add(user._id, e_ActiveType.LOGIN, e_HistoryType.ACCESS)
            if (!c_history) {
                this.setMessage('Lỗi kết nối, Vui lòng thử lại sau!')
                return false
            }

            this.setMessage('Đăng nhập tài khoản ITBlog thành công!')
            await redis_client.set(this.random, token)

            return { token_id: this.random, username: user.email.replace(/@(\D*)/, '') }
        } catch (error: any) {
            this.setMessage(error.message)
            return false
        }
    }

    public async tokenRedius(params: any) {
        try {
            const get_token = await redis_client.get(params.token_id)
            return {
                get_token
            }
        } catch (error: any) {
            this.setMessage(error.message)
            return false
        }
    }

    public async getUser(user: any) {
        try {

            const g_profile: any = await itBlogProfile.getProfile(user)
            const g_user = {
                email: user.email,
                exp: user.exp,
                profile_name: g_profile.profile_name,
            }

            return g_user
        } catch (error: any) {
            this.setMessage(error.message)
            return false
        }
    }

    public getMessage = () => {
        return this.message
    }

    private setMessage = (message: string) => {
        this.message = message
    }
}

export default new UserService('ITBlog.com')