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
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { email, password, name } = req.body;
                const userData = { email, password, name };
                const newUser = yield userService_1.default.registerUser(userData);
                const token = yield userService_1.default.generateToken(newUser.id);
                res.json({
                    token
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { email, password } = req.body;
                const user = yield userService_1.default.loginUser(email, password);
                const token = yield userService_1.default.generateToken(user.id);
                res.json({
                    data: {
                        id: user.id,
                        email: user.email,
                        name: user.email
                    },
                    token
                });
            }
            catch (err) {
                res.status(500).json({ error: 'Error while registering user' });
            }
        });
    }
}
exports.default = UserController;
