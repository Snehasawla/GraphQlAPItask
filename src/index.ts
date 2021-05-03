import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import {RegisterResolver} from "./modules/Users/Register";
import session from "express-session";
import ConnectRedis from "connect-redis";
import {redis} from "./redis";
import cors from "cors";
import { LoginResolver } from "./modules/Users/login";
import {MeResolver} from "./modules/Users/Me";
import { sendEmail } from "./modules/utils/sendEmail";
import { PostResolver } from "./modules/Post/PostCreate";


const main = async () =>{
    await createConnection();

    const schema = await buildSchema({
        resolvers: [ MeResolver, RegisterResolver, LoginResolver, PostResolver],
        authChecker:({ context: {req} }) => {
            return !!req.session.userId;
        }
    });

    const apolloServer = new ApolloServer({ schema, 
        formatError: formatArgumentValidationError,
        context: ({req}: any) => ({ req }) 
    });
    
    const app = Express();

    const RedisStore = ConnectRedis(session);

    app.use(
        cors({
            credentials:true,
            origin: "http://localhost:3000"
        })
    )

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "cookies",
            secret:"create to complete task after 4 commit.",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000*60*60*24*7*365// 7years of life
            } 
        })
    )

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
        await sendEmail();
    })

    main();
}