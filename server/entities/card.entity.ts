import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import DeckEntity from "./deck.entity";

@Entity({ name: 'card' })
class CardEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 256, nullable: true})
    name: string;

    @Column({nullable: true})
    answer: string;

    @OneToOne(type => DeckEntity)
    @JoinColumn()
    deck: DeckEntity;

}

export default CardEntity;