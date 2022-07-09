import fs from 'fs'

import interViewModel from '../model/inter_view'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'

import historyService from '../service/history'

import slugifyModule from '../module/slugify.module'

class InterViewService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async add(body: any, file: any, user: any, ip: string) {
        try {

            const check_exist = await interViewModel.findOne({name: body.name});
            if(check_exist) {
                const link = __dirname + '\\uploads\\inter_view\\';
                fs.unlinkSync(link.replace('\\service', '') + file.filename)
                this.setMessage('Bài Inter view này đã tồn tại, vui lòng đặt tên khác!')
                return false
            }

            body.user_auth = user._id
            body.image = file
            body.slug = slugifyModule.slug(body.name)

            const c_inter_view = await interViewModel.create(body)

            const c_history = await historyService.add(user._id, e_ActiveType.CREATE_INTERVIEW, e_HistoryType.ACTIVATE)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Tạo Interview - ${body.name} - thành công`)
            return c_inter_view
        } catch (error) {
            console.log(error);
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

export default new InterViewService('ITBlog.com')