import { NextFunction, Request, Response, RequestHandler } from "express";
import { CustomRequest } from "./interfaces";
import { verifyToken } from "./";

const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['authorization'];
        if (token) {
            const tokenParts = token.split(" ");
            token = tokenParts[1];
            const decoded: any = verifyToken(token);
            if (decoded && decoded._id) {
                (req as CustomRequest).isAuth = true;
                (req as CustomRequest).userId = decoded._id;
            } else {
                (req as CustomRequest).isAuth = false;
            }
        } else {
            (req as CustomRequest).isAuth = false;
        }
        next();
    } catch (err : any) {
        next(err);
    }
};

export default authMiddleware;