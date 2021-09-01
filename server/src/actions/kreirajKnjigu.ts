import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Knjiga } from "../entity/Knjiga";
import { User } from "../entity/User";
import { KnjigaDTO } from "./izmeniKnjigu";

export async function kreirajKnjigu(req: Request, res: Response) {
    console.log(req.files);
    console.log(req.body)
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