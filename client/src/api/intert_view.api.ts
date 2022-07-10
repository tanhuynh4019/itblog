import axios from "axios";
import userApi from "../api/user.api";
class InterViewApi {
    private url: string = process.env.VUE_APP_ROOT_API + '/api/inter-view';

    public async addInterView(body: any) {
        try {
            const c_inter_view = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return c_inter_view.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getBySlugInterView(params: any) {
        try {
            const {slug} = params
            const gbs_inter_view = await axios.get(this.url + `/${slug}`, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return gbs_inter_view.data
        } catch (error: any) {
            return error.response.data;
        }
    }

}

export default new InterViewApi();