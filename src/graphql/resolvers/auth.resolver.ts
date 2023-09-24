import userModel from '../../models/user.model';
import { Types } from 'mongoose';
import { generateToken } from '../../helpers';
import { CustomRequest, Register, TokenRequest } from '../../helpers/interfaces';

const authResolver = {
    register: async ({ inputRegister }: { inputRegister: Register }) => {
        try {
            const exists = await userModel.findOne({
                email: inputRegister.email
            });
            if (!exists) {
                return await userModel.create({ ...inputRegister });
            } else {
                throw new Error("User already exists")
            }
        } catch (err: any) {
            throw err;
        }
    },
    login: async ({inputLogin} : {inputLogin : Register}) => {
        try {
            const exists = await userModel.findOne({
                email: inputLogin.email,
                password : inputLogin.password
            }).lean();
            if (exists) {
                let token = generateToken(exists);
                return {
                    token
                };
            } else {
                throw new Error("Wrong password or account does not exists")
            }
        } catch (err: any) {
            throw err;
        }
    },
    users: async () => {
        try {
            const users = await userModel.find().lean();
            return users;
        } catch (err: any) {
            throw err;
        }
    },
    profile: async (args : null,req: CustomRequest) => {
        try {
            if (req.isAuth) {
                const user = await userModel.findOne({ _id: new Types.ObjectId(req.userId) });
                if(user){
                    return user;
                }else{
                    throw new Error("User does not exists");
                }
            } else {
                throw new Error("Unauthorized")
            }
        } catch (err: any) {
            throw err;
        }
    }
}

export default authResolver;