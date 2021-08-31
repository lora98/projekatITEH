

import React, { useRef } from 'react'
import { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { Autor, Knjiga, Zanr } from '../model'
import { setDropDownState, setInputState } from '../util';

interface Props {
    knjiga?: Knjiga,
    onSubmit: (knjiga: Knjiga) => Promise<void>,
    zanrovi: Zanr[],
    autori: Autor[]
}

export default function KnjigaForma(props: Props) {
    const [naziv, setNaziv] = useState('');
    const [brojStrana, setBrojStrana] = useState('');
    const [cena, setCena] = useState('');
    const [zanrId, setZanrId] = useState(0);
    const [autoriId, setAutoriId] = useState<number[]>([])
    const [opis, setOpis] = useState('')
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    return (
        <Form>
            <Form.Input value={naziv} onChange={setInputState(setNaziv)} label='Naziv' />
            <Form.Input value={brojStrana} onChange={setInputState(setBrojStrana)} label='Broj strana' type='number' />
            <Form.Input value={cena} onChange={setInputState(setCena)} label='Cena' type='number' />


            <Form.Input ref={imageRef} label='Slika' type='file' />
            <Form.Input ref={fileRef} label='Fajl' type='file' />


            <Form.Dropdown value={zanrId} onChange={setDropDownState(setZanrId)} selection label='Zanr' clearable options={props.zanrovi.map(element => {
                return {
                    key: element.id,
                    value: element.id,
                    text: element.naziv
                }
            })} />
            <Form.Dropdown onChange={setDropDownState(setAutoriId)} value={autoriId} selection label='Autori' clearable multiple options={props.autori.map(element => {
                return {
                    key: element.id,
                    value: element.id,
                    text: element.ime + ' ' + element.prezime
                }
            })} />
            <Form.TextArea value={opis} onChange={setInputState(setOpis)} label='Opis' />
            <Form.Button>Sacuvaj</Form.Button>
        </Form>
    )
}
