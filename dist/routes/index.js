"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const postRoute_1 = __importDefault(require("./postRoute"));
const router = express_1.default.Router();
const allRoutes = (0, express_1.default)();
allRoutes.use('/api', userRoute_1.default);
allRoutes.use('/api', postRoute_1.default);
router.get('/hello', (req, res) => {
    res.send('Hello, World!');
});
exports.default = allRoutes;
