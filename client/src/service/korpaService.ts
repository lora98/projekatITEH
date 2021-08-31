import axios from "axios";
import { Korpa } from "../model";
import { SERVER } from "../util";
axios.defaults.withCredentials = true;

export interface KorpaDTO {
    telefon: string,
    adresa: string,
    stavke: {
        knjigaId: number,
        kolicina: number
    }[]
}

export async function naruciService(korpa: Korpa) {
    await axios.post(SERVER + '/korpa', {
        adresa: korpa.adresa,
        telefon: korpa.telefon,
        stavke: korpa.stavke.map(stavka => {
            return {
                knjigaId: stavka.knjiga.id,
                kolicina: stavka.kolicina
            }
        })
    } as KorpaDTO);
}
export async function posalji(id: number) {
    await axios.patch(SERVER + '/korpa/' + id);

}