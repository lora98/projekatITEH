import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from "./Autor";
import { User } from "./User";
import { Zanr } from "./Zanr";


@Entity()
export class Knjiga {


    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    naziv: string

    @Column()
    brojStrana: number;

    @Column({ nullable: true })
    fajl?: string;

    @Column()
    slika: string;

    @ManyToOne(t => Zanr, { eager: true })
    zanr: Zanr

    @ManyToMany(t => Autor, { eager: true })
    @JoinTable({ name: 'autorstvo' })
    autori: Autor[]

    @ManyToOne(t => User, { eager: true })
    kreirao: User

    @Column()
    cena: number

    @Column()
    opis: string
}