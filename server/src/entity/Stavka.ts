import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Knjiga } from "./Knjiga";
import { Korpa } from "./Korpa";


@Entity()
export class Stavka {


    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(t => Korpa, { primary: true, onDelete: 'CASCADE' })
    korpa: Korpa;

    @ManyToOne(t => Knjiga, { eager: true })
    knjiga: Knjiga;


    @Column()
    kolicina: number;
}