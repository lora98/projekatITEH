import { Request, Response } from "express";
import { getRepository } from "typeorm"


export default function vratiSve(ent: any) {
    return async function (req: Request, res: Response) {
        res.json(await getRepository(ent).find());
    }
}