"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KEY = (_b = (_a = process.env.SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
const generateToken = (body) => {
    const token = jsonwebtoken_1.default.sign(body, KEY, {
        expiresIn: '1d'
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, KEY);
        return decoded;
    }
    catch (err) {
        throw err;
    }
};
exports.verifyToken = verifyToken;
