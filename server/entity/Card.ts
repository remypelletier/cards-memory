import internal = require("assert");
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Deck } from "./Deck";

@Entity()
export class Card extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 256, nullable: true})
    name: string;

    @Column({nullable: true})
    answer: string;

    @OneToOne(type => Deck)
    @JoinColumn()
    deck: Deck;

}