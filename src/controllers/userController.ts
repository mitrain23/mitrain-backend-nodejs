import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/userService";




class UserController {
    static async registerUser(req: Request, res: Response): Promise<any> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, name } = req.body
            const userData = { email, password, name };
            const newUser = await UserService.registerUser(userData)

            const token = await UserService.generateToken(newUser.id)

            res.json({
                token   
            })

        } catch (err: any) {
              res.status(500).json({ error: err.message });
        }
    }


    static async loginUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password} = req.body
            const user = await UserService.loginUser(email, password);

            const token = await UserService.generateToken(user.id);

            res.json({
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.email
                },
                token
            })

        } catch (err) {
            res.status(500).json({ error: 'Error while registering user' });
        }
    }
}




export default UserController