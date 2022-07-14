import axios from "axios";
import userApi from "./user.api";
class BlogApi {
    private url: string = process.env.VUE_APP_ROOT_API + '/api/blog';

    public async getBlog_p() {
        try {
            const c_blog = await axios.get(this.url + `-p`)
            return c_blog.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getBySlugBlog(params: any) {
        try {
            const { slug } = params
            const gbs_blog = await axios.get(this.url + `-slug/${slug}`)
            return gbs_blog.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async addBlog(body: any) {
        try {
            const c_blog = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return c_blog.data
        } catch (error: any) {
            return error.response.data;
        }
    }

}

export default new BlogApi();