import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Knjiga } from "../entity/Knjiga";
import { User } from "../entity/User";

export interface KnjigaDTO {

    naziv: string,
    brojStrana: number,
    zanr: number,
    autori: string,
    file?: string,
    image?: string,
    cena: number,
    opis: string
}
export async function kreirajKnjigu(req: Request, res: Response) {

    const user = (req.session as any).user as User;
    const data = req.body as KnjigaDTO;
    const insertRes = await getManager().save(Knjiga, {
        autori: JSON.parse(data.autori).map(id => {
            return {
                id
            }
        }),
        zanr: {
            id: data.zanr
        },
        brojStrana: data.brojStrana,
        cena: data.cena,
        naziv: data.naziv,
        slika: data.image,
        fajl: data.file,
        opis: data.opis,
        kreirao: {
            id: user.id
        }
    })
    res.json(await getRepository(Knjiga).findOne(insertRes.id));
}