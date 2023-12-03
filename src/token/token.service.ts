
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Token } from './token.model'

dotenv.config()

interface TokenPayload {
    userId: number;
    email: string;
    role: string;
  }
class TokenService {

    generateToken (payload: TokenPayload){
        console.log(payload)
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '30m'} )
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '30d'} )
        return{
            accessToken,
            refreshToken
        }

    }

    async saveToken(userId:number,refreshToken:string){
        const tokenData = await Token.findOne({ where: { userId } });
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();

        }
        const token = await Token.create({userId, refreshToken})
        return token
    }

}

export default TokenService