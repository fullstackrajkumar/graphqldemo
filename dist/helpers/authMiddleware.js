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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers['authorization'];
        if (token) {
            const tokenParts = token.split(" ");
            token = tokenParts[1];
            const decoded = (0, _1.verifyToken)(token);
            if (decoded && decoded._id) {
                req.isAuth = true;
                req.userId = decoded._id;
            }
            else {
                req.isAuth = false;
            }
        }
        else {
            req.isAuth = false;
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = authMiddleware;
