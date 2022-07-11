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

    public async editInterView(params: any, body: any) {
        try {
            const { id } = params;
            const e_inter_view = await axios.patch(this.url + `/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return e_inter_view.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getBySlugInterView(params: any) {
        try {
            const { slug } = params
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

    public async getByIdInterView(params: any) {
        try {
            const { id } = params
            const g_inter_view = await axios.get(this.url + `-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            console.log(g_inter_view);
            return g_inter_view.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getInterView_p() {
        try {
            const gp_inter_view = await axios.get(this.url + `-p`)
            return gp_inter_view.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getInterView_auth() {
        try {
            const g_inter_view_auth = await axios.get(this.url + `-auth`, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return g_inter_view_auth.data
        } catch (error: any) {
            return error.response.data;
        }
    }

}

export default new InterViewApi();