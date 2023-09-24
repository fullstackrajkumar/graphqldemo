import { Request } from "express";
import { Types } from "mongoose";

interface TokenRequest {
    _id: Types.ObjectId;
    name: string;
}

interface Register {
    name: string;
    email: string;
    password: string;
}

interface CustomRequest extends Request {
    isAuth: Boolean;
    userId: string;
}

export { CustomRequest, Register, TokenRequest }