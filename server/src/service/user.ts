import { createClient } from "redis"
import bcryptModule from '../module/bcrypt.module'
import jwtModule from '../module/jwt.module'

import userModel from '../model/user'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'

import historyService from '../service/history'

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
            if(exist_user){
                this.setMessage('E-mail đã được sử dụng, vui lòng chọn tài khoản khác hoặc quên mật khẩu!')
                return false
            }

            const c_user = await userModel.create(body)
            const token = await jwtModule.endcodedToken(c_user._id)

            if (!token) {
                this.setMessage('Đã đăng ký thành công, vui lòng đăng nhập!')
                return false
            }

            const c_history = historyService.add(c_user._id, e_ActiveType.REGISTER, e_HistoryType.ACCESS)
            if (!c_history) {
                this.setMessage('Đã đăng ký thành công, vì một số vấn đề nên vui lòng xác minh E-mail!')
                return false
            }

            this.setMessage('Đăng ký tài khoản ITBlog thành công!')
            await redis_client.set(this.random, token)

            return { token_id: this.random }

        } catch (error: any) {
            this.setMessage(error.message)
            return false
        }
    }

    public async tokenRedius(params: any){
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

    public getMessage = () => {
        return this.message
    }

    private setMessage = (message: string) => {
        this.message = message
    }
}

export default new UserService('ITBlog.com')