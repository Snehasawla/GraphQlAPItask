import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "src/modules/Users/types/Mycontext";

export const isAuth: Middleware<MyContext> = async({context}, next) => {
    if(!context.req.session!.userId){
        throw new Error("not Authenticated")
    }

    return next();
}