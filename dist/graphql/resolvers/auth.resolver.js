"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const mongoose_1 = require("mongoose");
const helpers_1 = require("../../helpers");
const authResolver = {
    register: ({ inputRegister }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exists = yield user_model_1.default.findOne({
                email: inputRegister.email
            });
            if (!exists) {
                return yield user_model_1.default.create(Object.assign({}, inputRegister));
            }
            else {
                throw new Error("User already exists");
            }
        }
        catch (err) {
            throw err;
        }
    }),
    login: ({ inputLogin }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exists = yield user_model_1.default.findOne({
                email: inputLogin.email,
                password: inputLogin.password
            }).lean();
            if (exists) {
                let token = (0, helpers_1.generateToken)(exists);
                return {
                    token
                };
            }
            else {
                throw new Error("Wrong password or account does not exists");
            }
        }
        catch (err) {
            throw err;
        }
    }),
    users: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find().lean();
            return users;
        }
        catch (err) {
            throw err;
        }
    }),
    profile: (args, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.isAuth) {
                const user = yield user_model_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(req.userId) });
                if (user) {
                    return user;
                }
                else {
                    throw new Error("User does not exists");
                }
            }
            else {
                throw new Error("Unauthorized");
            }
        }
        catch (err) {
            throw err;
        }
    })
};
exports.default = authResolver;
