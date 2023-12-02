import { User, UserAttributes } from "./user.model";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import nodemailer, { TransportOptions } from "nodemailer";
import TokenService from "../token/token.service";
import UserDto from "./user.dto";
import * as tls from 'tls';
import EmployeeService from "../employee/employee.service";



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


    async registration(email: string, password: string,  role: string, lastName : string,firstName: string,position: string) {

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists')
        }


        const hashedPassword = bcrypt.hashSync(password, 10);
        // const activationLink = uuidv4();
        const user = await User.create({ email, password: hashedPassword, role } as UserAttributes);
       
        this.sendActivationMail(email,password )

        // this.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

        const userDto = new UserDto(user); //id, email/isActivated
        ///&&&           
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.userId, tokens.refreshToken)
        await employeeService.saveEmployee(userDto.userId, firstName, lastName,position)
        return { ...tokens, user: userDto }

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




}

export default UserService