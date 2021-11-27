import internal = require("assert");
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64})
    firstName: string;

    @Column({length: 64})
    lastName: string;

    @Column({length: 256, nullable: true})
    email: string;

    @Column({length: 256, nullable: true})
    password: string;

    @Column({length: 256})
    resetPasswordLink: string;

    @Column()
    resetPasswordLinkExpirationTimestamp: number;

    @Column({length: 256})
    pictureName: string;

    @Column()
    AverageAnswerTimeInSeconds: number;

    @Column({length: 256})
    userRoleCode: string;

}