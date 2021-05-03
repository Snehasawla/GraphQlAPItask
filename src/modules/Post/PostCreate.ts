import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import { Post } from "../../entities/Post";
import { PostInput } from "src/modules/Post/postInput";
import { isAuth } from "../middleware/isAuth";
import {logger} from "../middleware/logger";

@Resolver()
export class PostResolver{
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }


    @Mutation(() => Post)
    async register(
    @Arg("title",{nullable: true}) {title}: PostInput,
    ): Promise<Post>
    {
        const post = await Post.create({
            title
        }).save()


        return post;
    }
}