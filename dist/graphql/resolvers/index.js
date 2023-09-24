"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_resolver_1 = __importDefault(require("./auth.resolver"));
const resolver = Object.assign({}, auth_resolver_1.default);
exports.default = resolver;
