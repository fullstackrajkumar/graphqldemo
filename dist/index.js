"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./graphql/schemas/schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const authMiddleware_1 = __importDefault(require("./helpers/authMiddleware"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(authMiddleware_1.default);
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    rootValue: resolvers_1.default,
    graphiql: true
}));
mongoose_1.default.connect("mongodb://localhost:27017/robust").then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(`Server could not start due to ${err}`);
});
