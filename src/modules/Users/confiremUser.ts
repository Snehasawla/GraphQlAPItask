import { Resolver, Mutation, Arg} from "type-graphql";
import { User } from "../../entities/User";
import {redis} from "../../redis";

@Resolver()
export class ConfirmUserResolver{
    @Mutation(() => Boolean)
    async confiremUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if(!userId){
        return false;
    }

    await User.update({id: parseInt(userId, 10)}, {confirmed: true})
    await redis.del(token);


    return true;
}

}