import { v4 } from "uuid";
import { redis } from "../../redis";
import { confirmationPrefix } from "../constants/redisPrefixes";

export const createConfiremationUrl =async (userId: number) =>{
    const token = v4();
    await redis.set(confirmationPrefix + token, userId, "ex", 60*60*24);  // 1 day expiration

    return `http://localhost:3000/confirm/${token}`;//expired in a day
}