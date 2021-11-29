import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity({ name:'answer_category' })
 class AnswerCategoryEntity extends BaseEntity {

    @PrimaryColumn({length: 64})
    code: string;

    @Column({length: 64, nullable: true})
    label: string;

}

export default AnswerCategoryEntity;
