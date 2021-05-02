import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
@Object
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column("text", {unique: true})
    email: string;

    @Column()
    password: string;

}