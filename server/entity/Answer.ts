import internal = require("assert");
import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { AnswerCategory } from "./AnswerCategory";
import { Card } from "./Card";
import { Test } from "./Test";

@Entity()
export class Answer extends BaseEntity {

    @OneToOne(type => Card, { primary: true, cascade: true })
    @JoinColumn()
    card: Card;

    @OneToOne(type => Test, { primary: true, cascade: true })
    @JoinColumn()
    test: Test;

    @OneToOne(type => AnswerCategory, { primary: true, cascade: true })
    @JoinColumn()
    answerCategory: AnswerCategory;

    @Column()
    date: Date;

}