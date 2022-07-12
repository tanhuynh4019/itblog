import fs from 'fs'

import lifeITModel from '../model/life_it'
import userModel from '../model/user'
import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'
import e_ROLE from '../common/role.enum'

import historyService from '../service/history'

import slugifyModule from '../module/slugify.module'

class LifeITService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async get_p() {
        try {
            const g_life_it = await lifeITModel.find({ is_browser: true }).populate({
                path: 'user_auth',
                populate: {
                    path: 'profile'
                }
            })
            this.setMessage('Đã tìm thấy dữ liệu!')
            return g_life_it
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async add(body: any, user: any, ip: string) {
        try {

            const tags = body.tags.split(',')

            const check_exist = await lifeITModel.findOne({ name: body.name });

            if (check_exist) {
                this.setMessage("Chủ đề này đã tồn tại, vui lòng đặt tên khác!")
                return false
            }

            if (user.role == e_ROLE.SUPERADMIN || e_ROLE.ADMIN) {
                body.is_browser = true
            }

            body.user_auth = user._id
            body.slug = slugifyModule.slug(body.name)
            body.tags = tags

            const c_life_it = await lifeITModel.create(body)

            const c_history = await historyService.add(user._id, e_ActiveType.CREATE_INTERVIEW, e_HistoryType.ACTIVATE)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Tạo chủ đề - ${body.name} - thành công!`)

            return c_life_it
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async edit(params: any, body: any, user: any, ip: string) {
        try {

            const { id } = params

            if (user.role == e_ROLE.SUPERADMIN || e_ROLE.ADMIN) {
                body.is_browser = true
            }

            body.user_auth = user._id
            body.update_date = Date.now()
            body.slug = slugifyModule.slug(body.name)

            const c_life_it = await lifeITModel.findByIdAndUpdate(id, body)

            const c_history = await historyService.add(user._id, e_ActiveType.CREATE_INTERVIEW, e_HistoryType.ACTIVATE)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Sửa chủ đề - ${body.name} - thành công!`)

            return c_life_it
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async delete(params: any, user: any, ip: string) {
        try {

            const { id } = params

            if (id === null) {
                return false
            }

            const c_life_it = await lifeITModel.findByIdAndDelete(id).then();

            const c_history = await historyService.add(user._id, e_ActiveType.CREATE_INTERVIEW, e_HistoryType.ACTIVATE)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Xóa thành công!`)

            return c_life_it
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async findBySlug(params: any) {
        try {
            const { slug } = params
            const gbs_inter_view = await lifeITModel.findOne({ slug }).populate({
                path: 'user_auth',
                populate: {
                    path: 'profile'
                }
            })

            if (!gbs_inter_view) {
                this.setMessage('Không tồn tại chủ đề này!')
                return false
            }
            this.setMessage('Đã tìm thấy dữ liệu!')
            return gbs_inter_view
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

export default new LifeITService('ITBlog.com')