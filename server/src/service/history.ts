import historyModel from '../model/history'

class HistoryService {

    public async add(user_id: string, content_type: string, history_type: number, post_id?: string) {
        const body = {
            user_id,
            content_type,
            history_type,
            post_id
        }
        const c_history = await historyModel.create(body)
        return c_history
    }

    public async addInterView(user_id: string, content_type: string, history_type: number, inter_view_id?: any, ip?: string) {
        const body = {
            user_id,
            content_type,
            history_type,
            inter_view_id,
            ip
        }
        const c_history = await historyModel.create(body)
        return c_history
    }
}

export default new HistoryService()