import jwt from 'jsonwebtoken';
import { TokenRequest } from './interfaces';
import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.SECRET_KEY?.toString() ?? "";

const generateToken = (body: TokenRequest) => {
    const token = jwt.sign(body,KEY, {
        expiresIn: '1d'
    });
    return token;
}

const verifyToken = (token:string) => {
    try{
        const decoded = jwt.verify(token,KEY);
        return decoded;
    }catch(err:any){
        throw err;
    }
}

export { generateToken, verifyToken }