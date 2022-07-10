import interViewQuestionModel from '../model/inter_view_question'
import interViewModel from '../model/inter_view'

import e_ActiveType from '../common/activity_type.enum'
import e_HistoryType from '../common/history.enum'
import e_ROLE from '../common/role.enum'

import historyService from '../service/history'

class InterViewQuestionService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)

    constructor(message: string) {
        this.message = message;
    }

    public async add(body: any, user: any, ip: string) {
        try {
            const check_exist = await interViewModel.findOne({
                user_auth: user._id,
                _id: body.id_inter_view
            })

            if(!check_exist){
                this.setMessage("không tìm thấy Inter view này!")
                return false
            }

            body.user_auth = user._id
            body.interview = body.id_inter_view
            const c_inter_view_question = await interViewQuestionModel.create(body)


            this.setMessage(`Thêm thành công câu hỏi ( ${c_inter_view_question.question} ) vào chủ đề ( ${check_exist.name} )`)
            return c_inter_view_question
        } catch (error) {
            console.log(error);
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


export default new InterViewQuestionService('ITBlog.com')