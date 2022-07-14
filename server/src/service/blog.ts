import fs from 'fs'

import blogModel from '../model/blog'
import userModel from '../model/user'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'
import e_ROLE from '../common/role.enum'

import historyService from '../service/history'

import slugifyModule from '../module/slugify.module'

class BlogService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async add(body: any, file: any, user: any, ip: string) {
        try {
            if (user.role == e_ROLE.USER) {
                this.setMessage('Bạn không có quyền đăng bài blog này!')
                return false
            }
            if (user.role > 4 || user.role < 0) {
                this.setMessage('Bạn không có quyền đăng bài blog này!')
                return false
            }

            const check_exist = await blogModel.findOne({ name: body.name });
            if (check_exist) {
                const link = __dirname + '\\uploads\\blog\\';
                fs.unlinkSync(link.replace('\\service', '') + file.filename)
                this.setMessage('Bài blog này đã tồn tại, vui lòng đặt tên khác!')
                return false
            }

            if (user.role == e_ROLE.SUPERADMIN || e_ROLE.ADMIN) {
                body.is_browser = true
            }

            body.user_auth = user._id
            body.image = file
            body.slug = slugifyModule.slug(body.name)

            console.log(body)

            const c_blog = await blogModel.create(body)

            const c_history = await historyService.add(user._id, e_ActiveType.CREATE_BLOG, e_HistoryType.ACTIVATE, c_blog._id)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Tạo Blog - ${body.name} - thành công`)
            return c_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async edit(params: any, body: any, file: any, user: any, ip: string) {
        try {
            const { id } = params
            if (user.role == e_ROLE.USER) {
                this.setMessage('Bạn không có quyền cập nhật bài Blog này!')
                return false
            }
            if (user.role > 4 || user.role < 0) {
                this.setMessage('Bạn không có quyền cập nhật bài Blog này!')
                return false
            }

            /*
            const check_exist = await blogModel.findOne({ name: body.name });
            if (check_exist) {
                
                if (file) {
                    const link = __dirname + '\\uploads\\blog\\';
                    fs.unlinkSync(link.replace('\\service', '') + file.filename)
                }
                this.setMessage('Bài blog này đã tồn tại, vui lòng đặt tên khác!')
                return false
            }
            */
            const check_exist: any = await blogModel.findOne({ name: body.name });
            if (file) {
                const link = __dirname + '\\uploads\\blog\\';
                fs.unlinkSync(link.replace('\\service', '') + check_exist.image.filename)
                body.image = file
            }
            body.update_date = Date.now()

            const e_blog: any = await blogModel.findByIdAndUpdate(id, body)

            const c_history = await historyService.add(user._id, e_ActiveType.EDIT_BLOG, e_HistoryType.ACTIVATE, e_blog._id)
            if (!c_history) {
                this.setMessage('Lỗi ghi lịch sử!')
                return false
            }

            this.setMessage(`Sửa Blog - ${body.name} - thành công`)
            return e_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async delete(params: any) {
        try {
            const { id } = params

            const d_blog: any = await blogModel.findByIdAndDelete(id)

            this.setMessage(`Xoá Blog thành công`)
            return d_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async findBySlug(params: any) {
        try {
            const { slug } = params
            const gbs_blog = await blogModel.findOne({ slug })


            if (!gbs_blog) {
                this.setMessage('Không tồn tại blog này!')
                return false
            }
            
            this.setMessage('Đã tìm thấy dữ liệu!')
            return gbs_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async getByID(params: any, user: any) {
        try {
            const { id } = params
            const gbs_blog = await blogModel.findOne({ _id: id })


            if (!gbs_blog) {
                this.setMessage('Không tồn tại blog này!')
                return false
            }

            if (gbs_blog.user_auth.toString() != user._id.toString()) {
                this.setMessage('Không có quyền truy cập vào blog này!')
                return false
            }
            this.setMessage('Đã tìm thấy dữ liệu!')
            return gbs_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async getBlog_public() {
        try {
            const g_blog = await blogModel.find({ is_browser: true, is_active: true });
            this.setMessage('Đã tìm thấy dữ liệu!')
            return g_blog
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async getBlogAuth(user: any) {
        try {
            const g_blog_auth = await blogModel.find({ user_auth: user._id })
            this.setMessage('Đã tìm thấy dữ liệu!')
            return g_blog_auth
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async findByIdToUser(id_blog: string, user: any) {
        try {
            const g_blog = await blogModel.findOne({ _id: id_blog, user_auth: user._id })


            if (!g_blog) {
                this.setMessage('Không tồn tại blog này!')
                return false
            }

            return g_blog
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

export default new BlogService('ITBlog.com')