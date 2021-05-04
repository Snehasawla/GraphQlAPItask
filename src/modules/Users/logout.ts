import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "src/modules/Users/types/Mycontext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("cookies");
        return res(true);
      })
    );
  }
}