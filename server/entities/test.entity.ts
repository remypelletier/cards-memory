import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import TestCategoryEntity from "./testCategory.entity";

@Entity({ name: 'test' })
class TestEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => TestCategoryEntity)
    @JoinColumn()
    testCategory: TestCategoryEntity;

}

export default TestEntity;
