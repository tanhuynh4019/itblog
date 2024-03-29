"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("./user/user"));
const router = (app) => {
    app.use(user_1.default);
    app.use((req, res, next) => {
        next(new http_errors_1.default.NotFound());
    });
    const errorHandler = (err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
            status: err.status || 500,
            message: err.message
        });
    };
    app.use(errorHandler);
};
exports.default = router;
