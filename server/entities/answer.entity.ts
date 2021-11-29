import { Entity, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import AnswerCategoryEntity from "./answerCategory.entity";
import CardEntity from "./card.entity";
import TestEntity from "./test.entity";

@Entity({ name: 'answer' })
class AnswerEntity extends BaseEntity {

    @OneToOne(type => CardEntity, { primary: true, cascade: true })
    @JoinColumn()
    card: CardEntity;

    @OneToOne(type => TestEntity, { primary: true, cascade: true })
    @JoinColumn()
    test: TestEntity;

    @OneToOne(type => AnswerCategoryEntity, { primary: true, cascade: true })
    @JoinColumn()
    answerCategory: AnswerCategoryEntity;

    @Column()
    date: Date;

}

export default AnswerEntity;
