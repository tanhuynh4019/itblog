"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_1 = __importDefault(require("../../controller/user"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post('/api/auth/register', upload.none(), user_1.default.registerUser);
exports.default = router;
