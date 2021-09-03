import axios from "axios";
import { Knjiga, KnjigaDTO } from "../model";
import { SERVER } from "../util";
axios.defaults.withCredentials = true;

export async function obrisiKnjiguService(id: number) {
    await axios.delete(SERVER + '/knjiga/' + id);
}

export async function izmeniKnjiguService(data: KnjigaDTO, id: number) {
    const res = await axios.patch(SERVER + '/knjiga/' + id, data);
    return res.data as Knjiga;

}
export async function kreirajKnjiguService(data: FormData) {
    const res = await axios.post(SERVER + '/knjiga', data, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
    return res.data as Knjiga;
}