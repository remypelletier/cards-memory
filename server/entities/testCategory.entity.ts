import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: 'test_category' })
class TestCategoryEntity extends BaseEntity {

    @PrimaryColumn({length: 64})
    code: string;

    @Column({length: 64, nullable: true})
    label: string;

}

export default TestCategoryEntity;