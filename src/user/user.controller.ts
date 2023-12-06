import app from "..";
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserAttributes } from "./user.model";
import UserService from "./user.service";
import { validationResult } from "express-validator/src/validation-result";


const userService = new UserService();


class UserController {


    async registration(req: Request, res: Response) {
        try {
            // const errors = validationResult(req)
            // if(!errors){
            //     return
            // }
            const role = 'employee';
            const { email, password, lastName, firstName, position } = req.body;
            const userData = await userService.registration(email, password, role, lastName, firstName, position);
            if (userData.error) {
                return res.status(409).json({ message: userData.error });
            } else {
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                console.log(userData);
                return res.json(userData);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async login(req: Request, res: Response) {

        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password)
            if (userData.error) {
                return res.status(409).json({ message: userData.error });
            }
            else {
             
                // res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                console.log(userData);
                return res.json(userData);
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
            const { refreshToken } = req.cookies;
            // const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json({message: 'successful'});
        } catch (error) {

        }
    }
    async activate(req: Request, res: Response) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }

    // async refresh(req: Request, res: Response) {
    //      try {
    //         const { refreshToken } = req.cookies;
    //         const userData = await userService.refresh(refreshToken)
    //         if (userData.error) {
    //             return res.status(409).json({ message: userData.error });
    //         }else{
    //             res.cookie('refreshToken', userData.refreshToken);
    //             return res.json(userData);
    //         }
          
    //     } catch (error) {

    //     }
    // }



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
