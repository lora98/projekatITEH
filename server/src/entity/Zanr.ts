import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zanr {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: string;
}