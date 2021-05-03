import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class PostInput{
    @Field() 
    @Length(1, 30)
    title: string;
}