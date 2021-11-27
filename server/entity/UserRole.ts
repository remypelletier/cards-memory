import internal = require("assert");
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class UserRole extends BaseEntity {

    @PrimaryColumn({length: 64})
    code: string;

    @Column({length: 64, nullable: true})
    label: string;

}