import {createClient} from "redis"
import bcryptModule from '../module/bcrypt.module'
import jwtModule from '../module/jwt.module'

import userModel from '../model/user'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'

import historyService from '../service/history' 

const redis_client = createClient()

class UserService {
    private message: string;
    private random: string = Math.random().toString(36).substring(2,7)

    constructor(message: string) {
        this.message = message;
    }

    public async register(body: any, ip: string) {
        try {
            const { password } = body
            const hashPassword = await bcryptModule.hashPassword(password)

            if (!hashPassword) {
                this.setMessage('Lỗi mật khẩu, vui lòng khử lại!')
                return false
            }

            body.ip = ip
            body.password_hash = hashPassword

            const c_user = await userModel.create(body)
            const token = await jwtModule.endcodedToken(c_user._id)

            if (!token) {
                this.setMessage('Đã đăng ký thành công, vui lòng đăng nhập!')
                return false
            }

            
            await redis_client.connect();
            await redis_client.set(this.random, token)

            const c_history = await historyService.add(c_user._id, e_ActiveType.REGISTER, e_HistoryType.ACCESS)
            if(!c_history){
                this.setMessage('Đã đăng ký thành công, vì một số vấn đề nên vui lòng xác minh E-mail!')
                return false
            }

            this.setMessage('Đăng ký tài khoản ITBlog thành công!')
            return { token_id: this.random }

        } catch (error: any) {
            if (error.code === 11000) {
                this.setMessage(error.code === 11000 ? 'E-mail đã tồn tại!' : error.message);
            }
            else{
                this.setMessage(error.message)
            }
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