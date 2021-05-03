import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "src/modules/Users/types/Mycontext";

export const logger: Middleware<MyContext> = async({args}, next) => {
    console.log(args, "arg");

    return next();
}