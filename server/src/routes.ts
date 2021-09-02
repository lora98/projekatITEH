import { Request, Response } from "express";
import * as multer from "multer";
import { isAdmin } from "./actions/isAdmin";
import { izmeniKnjigu } from "./actions/izmeniKnjigu";
import { kreirajKnjigu } from "./actions/kreirajKnjigu";
import { kreirajKorpu } from "./actions/kreirajKorpu";
import obrisi from "./actions/obrisi";
import { posaljiKorpu } from "./actions/posaljiKorpu";
import { renameFile } from "./actions/renameFile";
import vratiSve from "./actions/vratiSve";
import { Autor } from "./entity/Autor";
import { Knjiga } from "./entity/Knjiga";
import { Korpa } from "./entity/Korpa";
import { Zanr } from "./entity/Zanr";

export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    actions: ((req: Request, res: Response, next?: any) => void | Promise<void>)[]
}


const upload = multer({
    dest: '/uploads', fileFilter: function (req, file, cb) {
        if (!file) {
            cb(null, false)
        } else {
            cb(null, true);
        }
    }
}).fields([
    {
        name: 'image',
        maxCount: 1
    },
    {
        name: 'file',
        maxCount: 1
    }
])
export const Routes: Route[] = [{
    method: 'get',
    route: '/knjiga',
    actions: [vratiSve(Knjiga)]
}, {
    method: 'delete',
    route: '/knjiga/:id',
    actions: [isAdmin, obrisi(Knjiga)]
}, {
    method: 'get',
    route: '/zanr',
    actions: [vratiSve(Zanr)]
}, {
    method: 'get',
    route: '/autor',
    actions: [vratiSve(Autor)]
}, {
    method: 'post',
    route: '/korpa',
    actions: [kreirajKorpu]
}, {
    method: 'get',
    route: '/korpa',
    actions: [isAdmin, vratiSve(Korpa)]
}, {
    method: 'patch',
    route: '/korpa/:id',
    actions: [isAdmin, posaljiKorpu]
}, {
    method: 'patch',
    route: '/knjiga/:id',
    actions: [isAdmin, izmeniKnjigu]
}, {
    method: 'post',
    route: '/knjiga',
    actions: [isAdmin, upload, renameFile('image'), renameFile('file'), kreirajKnjigu]
}]