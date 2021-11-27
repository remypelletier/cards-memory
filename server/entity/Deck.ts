import internal = require("assert");
import { Entity, Column, BaseEntity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Deck extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64, nullable: true})
    name: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}