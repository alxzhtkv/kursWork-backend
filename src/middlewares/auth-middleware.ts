import jwt from 'jsonwebtoken';
import TokenService from '../token/token.service';
import { Request, Response, NextFunction } from 'express';
const tokenService = new TokenService()

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decodedToken = tokenService.validateAccessToken(token);
            if (typeof decodedToken === 'string') {
                throw new Error('Invalid token');
            } else {
                if (decodedToken) {
                    const userId = decodedToken.userId;
                    if (req.body.userId && req.body.userId !== userId) {
                        throw new Error('Invalid user ID');
                    } else {
                        console.log(userId)
                        next();
                    }
                }

            }
        }

    } catch (error) {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};

// const tokenService = new TokenService()

// module.exports = function (req: Request, res: Response) {
//     try {
//         const authorizationHeader = req.headers['authorization'];
//         if (!authorizationHeader)
//             return { error: 'invalid authorizationHeader' }
//         const accessToken = authorizationHeader.split(' ')[1]
//         if (!accessToken)
//             return { error: 'invalid accessToken' }
//         const userData = tokenService.validateAccessToken(accessToken)
//         if(!userData){
//             return  { error: 'userData is null' }
//         }
//     //    req.user = userData


//     } catch (e) {


//     }
// }
