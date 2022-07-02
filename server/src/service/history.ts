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
}

export default new HistoryService()