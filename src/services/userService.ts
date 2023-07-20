import prisma from "../utils/prisma";
import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

console.log(process.env.JWT_SECRET);

const salt = 10;

class UserService {
    static async registerUser(userData: UserModel) {
        try {
            const { email, password, name } = userData;

            if (!email || !password || !name) {
                throw Error('Name, email, and password are required');
            }

            const existingUser = await prisma.user.findUnique({
                where: { email: email }
            })

            if (existingUser) {
                throw Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            })

            return newUser
        } catch (err: any) {
            throw Error(err.message);
        }
    }


    static async loginUser(email: string, password: string) {
        try {

            // Check if user exists
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Compare passwords
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                throw new Error('Invalid credentials');
            }

            return user;
        } catch (error) {
            console.error('login error');
            throw error;
        }
    }

    static async generateToken(userId: number | undefined) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || '', { expiresIn: '4h' });
        return token
    }

}


export default UserService;