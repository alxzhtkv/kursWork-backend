import app from "..";
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserAttributes } from "./user.model";
import UserService from "./user.service";


const userService = new UserService();


class UserController {


    async registration(req: Request, res: Response) {
        try {
            const role = 'employee'
            const { email, password, lastName, firstName, position } = req.body;
            const userData = await userService.registration(email,password,role,lastName,firstName,position)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            console.log(userData)
            return res.json(userData);

        } catch (error) {
            console.log(error)
        }
    }

  

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
            } else if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).json({ message: 'Invalid credentials' });
            } else {
                res.status(200).json({ message: 'Login successful' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getUsers(req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }
    async activate(req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }

    async refresh(req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }



}

export default UserController

// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = bcrypt.hashSync(password, 10);

//         await User.create({ username, password: hashedPassword } as UserAttributes);

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// export const loginUser = async (req: Request, res: Response) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ where: { username } });

//         if (!user) {
//             res.status(401).json({ message: 'Invalid credentials' });
//         } else if (!bcrypt.compareSync(password, user.password)) {
//             res.status(401).json({ message: 'Invalid credentials' });
//         } else {
//             res.status(200).json({ message: 'Login successful' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }


// app.post('/login', async (req: Request, res: Response) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ where: { username } });

//         if (!user) {
//             res.status(401).json({ message: 'Invalid credentials' });
//         } else if (!bcrypt.compareSync(password, user.password)) {
//             res.status(401).json({ message: 'Invalid credentials' });
//         } else {
//             res.status(200).json({ message: 'Login successful' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
