"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const role_enum_1 = __importDefault(require("../common/role.enum"));
const type_login_enum_1 = __importDefault(require("../common/type_login.enum"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password_hash: { type: String, required: true },
    email: { type: String, required: true, validate: validator_1.default.isEmail, unique: true },
    role: { type: Number, required: true, default: role_enum_1.default.USER, enum: [role_enum_1.default.USER, role_enum_1.default.EDITOR, role_enum_1.default.ADMIN, role_enum_1.default.SUPERADMIN] },
    login_type: { type: Number, required: true, default: type_login_enum_1.default.DEFAULT, enum: [type_login_enum_1.default.DEFAULT, type_login_enum_1.default.FACEBOOK, type_login_enum_1.default.GOOGLE, type_login_enum_1.default.ZALO, type_login_enum_1.default.GITHUB] },
    phone: { type: Number },
    coin: { type: Number, default: 0 },
    ip: { type: String, required: true },
    is_vip: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    is_bin: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    is_email: { type: Boolean, default: false },
    email_verification_date: { type: Date },
    start_date: { type: Date, default: Date.now() },
    updated_date: { type: Date, default: null },
    login_date: { type: Date, default: Date.now() },
    vip_expiration_date: { type: Date, default: null }
});
exports.default = mongoose_1.default.model('User', userSchema);
