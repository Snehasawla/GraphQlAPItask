import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User{
    @Field(type => ID)
    id: string;

    @Field({})
    username: string;

    @Field({nullable: true})
    email?: string;

    @Field()
    password: string;

    @Field(type => [Post])    
    posts: [];
}

@ObjectType()
class Post{
    @Field(type => String)
    title: string;

    user: User;
}