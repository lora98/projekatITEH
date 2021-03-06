import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Knjiga } from "../entity/Knjiga";
import { User } from "../entity/User";

export async function izmeniKnjigu(req: Request, res: Response) {
    const user = (req.session as any).user as User;
    const data = req.body
    const id = Number(req.params.id);
    if (!id || isNaN(id)) {
        res.sendStatus(400);
        return;
    }
    await getManager().save(Knjiga, {
        id,
        autori: data.autori.map(element => {
            return {
                id: element
            }
        }),
        zanr: {
            id: data.zanr
        },
        brojStrana: data.brojStrana,
        cena: data.cena,
        naziv: data.naziv,

        opis: data.opis

    })
    res.json(await getRepository(Knjiga).findOne(id));
}