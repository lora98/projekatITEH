import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Korpa } from "../entity/Korpa";

export async function posaljiKorpu(req: Request, res: Response) {
    const id = Number(req.params.id)
    await getRepository(Korpa).update(id, { poslata: true });
    res.sendStatus(204);
}