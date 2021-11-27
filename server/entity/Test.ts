import internal = require("assert");
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { TestCategory } from "./TestCategory";

@Entity()
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => TestCategory)
    @JoinColumn()
    testCategory: TestCategory;

}