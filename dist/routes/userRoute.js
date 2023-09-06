"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
router.get('', (req, res) => {
    res.status(200).json('api ready');
});
router.post('/register', multer_1.default.single('images'), userController_1.default.registerUser);
router.post('/login', userController_1.default.loginUser);
router.get('/user', userController_1.default.getAllUser);
exports.default = router;
