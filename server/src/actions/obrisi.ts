import { Request, Response } from "express";
import { getRepository } from "typeorm"


export default function obrisi(ent: any) {
    return async function (req: Request, res: Response) {
        await getRepository(ent).delete(req.params.id);
        res.sendStatus(204);
    }
}