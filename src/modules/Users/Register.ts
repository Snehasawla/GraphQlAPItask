import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./Register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import {logger} from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class RegisterResolver{
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }


    @Mutation(() => User)
    async register(
    @Arg("data") {firstName, lastName, email, password}: RegisterInput,
    ): Promise<User>
    {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save()

        await sendEmail(email, url);

        return user;
    }
}