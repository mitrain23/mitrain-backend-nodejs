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
class UserService {
    static registerUser(userData, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, address, phoneIntWhatsapp, phoneIntContact } = userData;
            const imagePath = images.path;
            if (!email ||
                !password ||
                !name ||
                !address ||
                !phoneIntWhatsapp ||
                !phoneIntContact ||
                !imagePath) {
                throw Error('Fill all the require data');
            }
            const existingUser = yield prisma_1.default.user.findUnique({
                where: { email: email }
            });
            if (existingUser) {
                throw Error('User already exists');
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield prisma_1.default.user.create({
                data: {
                    email,
                    password: hashPassword,
                    name,
                    address,
                    phoneIntContact,
                    phoneIntWhatsapp,
                    isPremium: false,
                    images: {
                        create: {
                            url: imagePath
                        }
                    }
                },
                include: {
                    images: {
                        select: {
                            url: true
                        }
                    }
                }
            });
            return newUser;
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static generateToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || '', {
                expiresIn: '4h'
            });
            return token;
        });
    }
    static getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findMany({
                include: {
                    images: {
                        select: {
                            url: true
                        }
                    }
                }
            });
            return user;
        });
    }
}
exports.default = UserService;
