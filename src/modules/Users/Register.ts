import { query } from "express";
import { Resolver, Query, Mutation, Arg, FieldResolver, Root} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./Register/RegisterInput";

@Resolver()
export class RegisterResolver{
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

        return user;
    }
}