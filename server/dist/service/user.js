"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_module_1 = __importDefault(require("../module/bcrypt.module"));
const jwt_module_1 = __importDefault(require("../module/jwt.module"));
const user_1 = __importDefault(require("../model/user"));
const activity_type_enum_1 = __importDefault(require("../common/activity_type.enum"));
const history_enum_1 = __importDefault(require("../common/history.enum"));
const history_1 = __importDefault(require("../service/history"));
class UserService {
    constructor(message) {
        this.getMessage = () => {
            return this.message;
        };
        this.setMessage = (message) => {
            this.message = message;
        };
        this.message = message;
    }
    register(body, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = body;
                const hashPassword = yield bcrypt_module_1.default.hashPassword(password);
                if (!hashPassword) {
                    this.setMessage('Lỗi mật khẩu, vui lòng khử lại!');
                    return false;
                }
                body.ip = ip;
                body.password_hash = hashPassword;
                const c_user = yield user_1.default.create(body);
                const token = yield jwt_module_1.default.endcodedToken(c_user._id);
                if (!token) {
                    this.setMessage('Đã đăng ký thành công, vui lòng đăng nhập!');
                    return false;
                }
                const c_history = yield history_1.default.add(c_user._id, activity_type_enum_1.default.REGISTER, history_enum_1.default.ACCESS);
                if (!c_history) {
                    this.setMessage('Đã đăng ký thành công, vì một số vấn đề nên vui lòng xác minh E-mail!');
                    return false;
                }
                this.setMessage('Đăng ký tài khoản ITBlog thành công!');
                return { token };
            }
            catch (error) {
                if (error.code === 11000) {
                    this.setMessage(error.code === 11000 ? 'E-mail đã tồn tại!' : error.message);
                }
                else {
                    this.setMessage(error.message);
                }
                return false;
            }
        });
    }
}
exports.default = new UserService('ITBlog.com');
