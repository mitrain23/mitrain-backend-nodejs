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
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
console.log(process.env.JWT_SECRET);
const salt = 10;
class UserService {
    static registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = userData;
                if (!email || !password || !name) {
                    throw Error('Name, email, and password are required');
                }
                const existingUser = yield prisma_1.default.user.findUnique({
                    where: { email: email }
                });
                if (existingUser) {
                    throw Error('User already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const newUser = yield prisma_1.default.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        name
                    }
                });
                return newUser;
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if user exists
                const user = yield prisma_1.default.user.findUnique({ where: { email } });
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                // Compare passwords
                const passwordsMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordsMatch) {
                    throw new Error('Invalid credentials');
                }
                return user;
            }
            catch (error) {
                console.error('login error');
                throw error;
            }
        });
    }
    static generateToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || '', { expiresIn: '4h' });
            return token;
        });
    }
}
exports.default = UserService;
