import axios from "axios";
import userApi from "../api/user.api";
class ProfileApi {
    private url: string = process.env.VUE_APP_ROOT_API  + '/api/profile';

    public async getProfile() {
        try {
            const g_profile = await axios.get(this.url, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return g_profile.data
        } catch (error: any) {
            return error.response.data;
        }
    }

}

export default new ProfileApi();