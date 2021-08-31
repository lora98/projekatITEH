import { Request, Response } from "express";
import { isAdmin } from "./actions/isAdmin";
import { kreirajKorpu } from "./actions/kreirajKorpu";
import obrisi from "./actions/obrisi";
import { posaljiKorpu } from "./actions/posaljiKorpu";
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
export const Routes: Route[] = [{
    method: 'get',
    route: '/knjiga',
    actions: [vratiSve(Knjiga)]
}, {
    method: 'delete',
    route: '/knjiga/:id',
    actions: [obrisi(Knjiga)]
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
}]