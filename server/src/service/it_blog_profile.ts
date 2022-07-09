import itBlogProfileModel from '../model/it_blog_profile'

class ITBlogProfileService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async add_new_contructor(_id: string, profile_name: string) {
        try {
            const body = {
                user_auth: _id,
                profile_name
            }
            const c_it_blog_profile = await itBlogProfileModel.create(body)
            return c_it_blog_profile
        } catch (error) {
            return false
        }
    }

    public async getProfile(user: any) {
        try {
            const g_profile = await itBlogProfileModel.findOne({user_auth: user._id});
            
            if(!g_profile){
                this.setMessage('Không tồn tại user này!')
                return false
            }
            return g_profile
        } catch (error) {
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

export default new ITBlogProfileService('ITBlog.com')