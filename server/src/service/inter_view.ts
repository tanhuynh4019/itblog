import fs from 'fs'

import interViewModel from '../model/inter_view'
import userModel from '../model/user'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'
import e_ROLE from '../common/role.enum'

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
            
            console.log(user.role);
            if(user.role == e_ROLE.USER){
                this.setMessage('Bạn không có quyền đăng bài Inter view này!')
                return false                
            }
            if(user.role > 4 || user.role < 0){
                this.setMessage('Bạn không có quyền đăng bài Inter view này!')
                return false
            }
            
            const check_exist = await interViewModel.findOne({name: body.name});
            if(check_exist) {
                const link = __dirname + '\\uploads\\inter_view\\';
                fs.unlinkSync(link.replace('\\service', '') + file.filename)
                this.setMessage('Bài Inter view này đã tồn tại, vui lòng đặt tên khác!')
                return false
            }

            if(user.role == e_ROLE.SUPERADMIN || e_ROLE.ADMIN){
                body.is_browser = true
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

    public async findBySlug(params: any, user: any) {
        try {
            const { slug} = params
            const gbs_inter_view = await interViewModel.findOne({slug})

            
            if(!gbs_inter_view){
                this.setMessage('Không tồn tại Inter view này!')
                return false
            }

            if(gbs_inter_view.user_auth.toString() != user._id.toString()){
                this.setMessage('Không có quyền truy cập vào Inter view này!')
                return false
            }
            this.setMessage('Đã tìm thấy dữ liệu!')
            return gbs_inter_view
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async getInterView_public() {
        try {
            const g_inter_view = await interViewModel.find({is_browser: true}).populate({
                path: 'user_auth',
                populate: {
                    path: 'profile'
                }
            })
            this.setMessage('Đã tìm thấy dữ liệu!')
            return g_inter_view
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async findByIdToUser(id_inter_view: string, user: any) {
        try {
            const g_inter_view = await interViewModel.findOne({_id: id_inter_view, user_auth: user._id})

            
            if(!g_inter_view){
                this.setMessage('Không tồn tại Inter view này!')
                return false
            }

            return g_inter_view
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