import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateAccessToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Access token missing')

    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
    req['user'] = userData

    next()
}