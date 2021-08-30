import { PrimaryGeneratedColumn, ManyToOne, Column, Entity, OneToMany } from "typeorm";
import { Stavka } from "./Stavka";
import { User } from "./User";

@Entity()
export class Korpa {

    @PrimaryGeneratedColumn()
    id?: number;


    @ManyToOne(type => User, { eager: true })
    user: User

    @Column()
    poslata: boolean

    @Column()
    adresa: string

    @Column()
    telefon: string

    @OneToMany(t => Stavka, s => s.korpa, { eager: true })
    stavke: Stavka[]
}