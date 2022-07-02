"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const redis_1 = __importDefault(require("redis"));
const config_1 = __importDefault(require("./config/config"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const client = redis_1.default.createClient();
client.on('connect', function () {
    console.log('object');
});
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// ** Connect to Mongo **
mongoose_1.default.connect(config_1.default.mongo.url, config_1.default.mongo.options).then((client) => {
    console.log('👍 Database connection successful!');
}).catch(() => console.log('😥 Database connection failed!'));
// ** Connect router **
(0, router_1.default)(app);
// ** Connect server **
app.listen(config_1.default.server.server_port, () => console.log(`Connect port ${config_1.default.server.server_port}`));
