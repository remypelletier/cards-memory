import { Entity, Column, BaseEntity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";

@Entity({ name: 'deck' })
class DeckEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64, nullable: true})
    name: string;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user: UserEntity;

}

export default DeckEntity;
