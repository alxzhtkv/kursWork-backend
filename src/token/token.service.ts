
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Token } from './token.model'

dotenv.config()

interface TokenPayload {
    userId: number;
    email: string;
    role: string;
    firstName: string,
    lastName: string;

  }
class TokenService {

    generateToken (payload: TokenPayload){
        console.log(payload)
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '30d'} )
        // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '30d'} )
        return{
            accessToken,
            // refreshToken
        }

    }

    // async saveToken(userId:number,refreshToken:string){
    //     const tokenData = await Token.findOne({ where: { userId } });
    //     if(tokenData){
    //         tokenData.refreshToken = refreshToken;
    //         return tokenData.save();

    //     }
    //     const token = await Token.create({userId, refreshToken})
    //     return token
    // }

    // async removeToken(refreshToken:string){
    //     const tokenData =  await Token.destroy({ where: { refreshToken } });
    //     return tokenData

    // }
    // async findToken(refreshToken:string){
    //     const tokenData =  await Token.findOne({ where: { refreshToken } });
    //     return tokenData

    // }

    validateAccessToken(token:string){
        try{
            if (process.env.JWT_ACCESS_SECRET){
                const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
                console.log(userData)
                return userData
            }
          
        }catch(e){
            return null;
        }
    }

    // validateRefreshToken(token:string){
    //     try{
    //         if (process.env.JWT_REFRESH_SECRET){
    //             const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    //             return userData
    //         }
          
    //     }catch(e){
    //         return null;
    //     }
    // }


    


}

export default TokenService