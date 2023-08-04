"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Multer configuration
const storage = multer_1.default.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, new Date().getMonth() +
            new Date().getFullYear() + new Date().getDate() +
            Math.random().toString(35).slice(3) + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
