import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Autor {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ime: string;

    @Column()
    prezime: string;
}