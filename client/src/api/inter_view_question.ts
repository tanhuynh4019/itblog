import axios from "axios";
import userApi from "../api/user.api";
class InterViewQuesionApi {
    private url: string = process.env.VUE_APP_ROOT_API + '/api/inter-view-question';

    public async addInterViewQuestion(body: any) {
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

}

export default new InterViewQuesionApi();