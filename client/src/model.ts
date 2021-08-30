export interface Autor {
    id: number,
    ime: string,
    prezime: string,
}
export interface Knjiga {
    id?: number,
    naziv: string,
    brojStrana: number,
    fajl?: string,
    slika: string,
    zanr: Zanr,
    autori: Autor[],
    kreirao: User,
    cena: number,
    opis: string
}

export interface Zanr {
    id: number,
    naziv: string,
}
export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,

}

export interface Korpa {
    id?: number,
    user: User,
    poslata: boolean,
    adresa: string,
    telefon: string,
    stavke: Stavka[]
}

export interface Stavka {
    id?: number,
    knjiga: Knjiga,
    kolicina: number
}