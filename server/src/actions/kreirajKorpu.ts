import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Korpa } from "../entity/Korpa";
import { Stavka } from "../entity/Stavka";

export interface KorpaDTO {
    telefon: string,
    adresa: string,
    stavke: {
        knjigaId: number,
        kolicina: number
    }[]
}

export async function kreirajKorpu(req: Request, res: Response) {
    const data = req.body as KorpaDTO;
    const user = (req.session as any).user;
    await getManager().transaction(async manager => {
        const novaKorpa = await manager.save(Korpa, {
            adresa: data.adresa,
            telefon: data.telefon,
            user,
            poslata: false,
        })
        await manager.save(Stavka, data.stavke.map(stavka => {
            return {
                kolicina: stavka.kolicina,
                knjiga: {
                    id: stavka.knjigaId
                },
                korpa: {
                    id: novaKorpa.id
                }
            }
        }))
    })

    res.sendStatus(204);
}