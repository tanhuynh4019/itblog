import axios from "axios";
class UserApi{
    private url: string = process.env.VUE_APP_ROOT_API  + '/api/auth';

    public async tokenRedius(){
        try {
            const get_key = localStorage.getItem("token_id")     
            const token_redius = await axios.get(this.url + `/token_redius/${get_key}`)
            return token_redius.data.data.get_token  
        } catch (error) {
            console.log('Lỗi xác thực!');
        }
    }
    
    public async register(body: any) {
        try {
            const c_user = await axios.post(this.url + '/register', body)
            return c_user.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async login(body: any) {
        try {
            const e_user = await axios.patch(this.url + '/login', body)
            return e_user.data
        } catch (error: any) {
            return error.response.data;
        }
    }

    public async getAuth() {
        try {
            const g_user = await axios.get(this.url, {
                headers: {
                    Authorization: `Bearer ${await this.tokenRedius()}`
                }
            })
            return g_user.data
        } catch (error: any) {
            return error.response.data;
        }
    }
    
}

export default new UserApi();