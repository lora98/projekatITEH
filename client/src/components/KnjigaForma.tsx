

import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Form, Ref } from 'semantic-ui-react'
import { Autor, Knjiga, KnjigaDTO, Zanr } from '../model'
import { setDropDownState, setInputState } from '../util';

interface Props {
    knjiga?: Knjiga,
    onSubmit: (knjiga: any) => Promise<void>,
    obrisi?: () => Promise<void>
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
    const imageRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNaziv(props.knjiga?.naziv || '')
        setBrojStrana(props.knjiga ? props.knjiga.brojStrana + '' : '');
        setCena(props.knjiga ? props.knjiga.cena + '' : '');
        setZanrId(props.knjiga?.zanr.id || 0);
        setAutoriId((props.knjiga?.autori || []).map(e => e.id))
        setOpis(props.knjiga?.opis || '');

    }, [props.knjiga])

    return (
        <>
            <Form onSubmit={() => {
                if (props.knjiga) {
                    props.onSubmit({
                        autori: autoriId,
                        brojStrana: Number(brojStrana),
                        cena: Number(cena),
                        naziv,
                        opis,
                        zanr: zanrId
                    } as KnjigaDTO)
                    return;
                }
                const data = new FormData();
                data.append('autori', JSON.stringify(autoriId));
                data.append('brojStrana', brojStrana)
                data.append('cena', cena)
                data.append('naziv', naziv)
                data.append('opis', opis)
                data.append('zanr', zanrId + '')
                if (!fileRef.current) {
                    alert('nema ref');
                    return;
                }
                const fileElement = fileRef.current?.lastChild?.lastChild as HTMLInputElement;

                if (!fileElement.files) {
                    return;
                }
                const imageElement = imageRef.current?.lastChild?.lastChild as HTMLInputElement;

                if (!imageElement.files) {
                    return;
                }
                if (fileElement.files.length > 0)
                    data.append('file', fileElement.files[0]);

                data.append('image', imageElement.files[0]);
                props.onSubmit(data);
            }}>
                <Form.Input required value={naziv} onChange={setInputState(setNaziv)} label='Naziv' />
                <Form.Input required value={brojStrana} onChange={setInputState(setBrojStrana)} label='Broj strana' type='number' />
                <Form.Input required value={cena} onChange={setInputState(setCena)} label='Cena' type='number' />


                {
                    !props.knjiga && (
                        <>
                            <Ref innerRef={imageRef}>
                                <Form.Input required label='Slika' type='file' />
                            </Ref>
                            <Ref innerRef={fileRef}>
                                <Form.Input label='Fajl' type='file' />
                            </Ref>
                        </>
                    )
                }

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
                <Form.TextArea required value={opis} onChange={setInputState(setOpis)} label='Opis' />
                <Form.Button fluid>Sacuvaj</Form.Button>
            </Form>
            {
                props.knjiga && (
                    <Button className='marginButton' fluid negative onClick={() => {
                        if (props.obrisi) {
                            props.obrisi();
                        }
                    }}>Obrisi</Button>
                )
            }
        </>
    )
}
