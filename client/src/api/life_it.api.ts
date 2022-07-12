import axios from "axios";
import userApi from "./user.api";
class LifeITApi {
    private url: string = process.env.VUE_APP_ROOT_API + '/api/life-it';

    public async getLifeIT_p() {
        try {
            const c_life_it = await axios.get(this.url + `-p`)
            return c_life_it.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getBySlugLifeIT(params: any) {
        try {
            const { slug } = params
            const gbs_life_it = await axios.get(this.url + `-slug/${slug}`)
            return gbs_life_it.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async addLifeIT(body: any) {
        try {
            const c_life_it = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return c_life_it.data
        } catch (error: any) {
            return error.response.data;
        }
    }
}

export default new LifeITApi();