import { User, UserAttributes } from "./user.model";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import nodemailer, { TransportOptions } from "nodemailer";
import TokenService from "../token/token.service";
import UserDto from "./user.dto";
import * as tls from 'tls';
import EmployeeService from "../employee/employee.service";
import { Employee } from "../employee/employee.model";



///бшлоывлмтлдвмт
const tokenService = new TokenService()
const employeeService = new EmployeeService()


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
} as TransportOptions);

class UserService {


    async registration(email: string, password: string, role: string, lastName: string, firstName: string, position: string) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return { accessToken: '', user: [], error: 'User already exists', };
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ email, password: hashedPassword, role } as UserAttributes);

        // this.sendActivationMail(email, password);

        const userDto = new UserDto({...user,firstName,lastName});
        const tokens = tokenService.generateToken({ ...userDto });
        // await tokenService.saveToken(userDto.userId, tokens.refreshToken);
        await employeeService.saveEmployee(userDto.userId, firstName, lastName, position);

        return { ...tokens, user: userDto };

    }


    async sendActivationMail(to: string, password: string) {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Активация аккаунта на сайте Cosmotask",
            text: '',
            html: `
              <div>
                <h3>Ваш логин для входа: ${to} </h3>
                <h3>Ваш пароль для входа: ${password}</h3>
                <h1>Для входа в персональный аккаунт перейдите по ссылке</h1>
                <a href="${process.env.API_URL}/login">${process.env.API_URL}/login</a>
              </div>
            `,
        })

    }

    async login(email: string, password: string) {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return { accessToken: '', error: 'Have not users with this email', };

            } else if (!bcrypt.compareSync(password, user.password)) {
                return { accessToken: '', error: 'Invalid credentials', };

            } else {
                if (user.isActivated === false) {
                    user.isActivated = true
                    user.save();
                    // await User.update({ isActivated: true }, { where: { userId: user.userId } });
                }
                const employeData = await employeeService.getEmployee(user.userId);
                if(employeData){
                    const userDto = new UserDto({ email:user.email,
                        userId: user.userId,role: user.role, firstName: employeData?.firstName, lastName: employeData?.lastName });
                    console.log('userDto',userDto)
                    const tokens = tokenService.generateToken({ ...userDto });
                    return { accessToken: tokens.accessToken };
                }
               

            }
        } catch (error) {
            console.error(error);
            return {accessToken: '', error: 'Internal server error', };

        }
    }



    async getUserInfo(accessToken: string) {
        const user = tokenService.validateAccessToken(accessToken)
        return user


    }




    async logout(refreshToken: string) {
        // const token = await tokenService.removeToken(refreshToken);
        // return token
    }

    async refresh(refreshToken: string) {
        // if (!refreshToken) {
        //     return {  refreshToken: '', accessToken: '', user: [],error: 'invalid token' }
        // }
        // const userData = tokenService.validateRefreshToken(refreshToken);
        // const tokenFromDb = await tokenService.findToken(refreshToken);
        // if (!userData || !tokenFromDb) {
        //     return {  refreshToken: '', accessToken: '', user: [],error: 'unathohorizated user'};
        // }

        // if (typeof userData === 'object' && 'userId' in userData) {
        //     const user = await User.findByPk(userData.userId);
        //     if (user) {
        //         const userDto = new UserDto(user);
        //         const tokens = tokenService.generateToken({ ...userDto });
        //         await tokenService.saveToken(userDto.userId, tokens.refreshToken);
        //         return { ...tokens, user: userDto };
        //     }
        // }
        // return {}

    }
}

export default UserService