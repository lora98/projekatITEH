import { Request, Response } from "express";
import { User } from "../entity/User";

export async function isAdmin(req: Request, res: Response, next: () => void) {
    const user = (req.session as any).user as User;
    if (!user.isAdmin) {
        res.sendStatus(403);
    } else {
        next();
    }

}