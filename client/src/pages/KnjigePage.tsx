

import React, { useState } from 'react';
import { Form, Grid, Header, Pagination } from 'semantic-ui-react';
import KnjigaHomeCard from '../components/KnjigaHomeCard';
import { Autor, Knjiga, Zanr } from '../model';
import { setDropDownState, setInputState } from '../util';

interface Props {
    knjige: Knjiga[],
    autori: Autor[],
    zanrovi: Zanr[],
}

export default function Knjige(props: Props) {
    const [naziv, setNaziv] = useState('');
    const [zanrovi, setZanrovi] = useState<number[]>([]);
    const [autori, setAutori] = useState<number[]>([])
    const [aktivnaStrana, setAktivnaStrana] = useState(1);
    const validnaKnjiga = (knjiga: Knjiga) => {
        return knjiga.naziv.includes(naziv) && (zanrovi.length === 0 || zanrovi.includes(knjiga.zanr.id)) && (autori.length === 0 || knjiga.autori.reduce((acc, element) => {
            return acc || autori.includes(element.id)
        }, false as boolean))
    }
    const filtriraneKnjige = props.knjige.filter(validnaKnjiga);
    return (
        <div>
            <br />

            <Header textAlign='center' >
                <h1 className='marginBottom-very'>Pretraga knjiga</h1>
            </Header>
            <Grid container columns='16' className='marginTop-very'>
                <Grid.Row>
                    <Grid.Column width='4'>

                        <Header>Filtriraj</Header>
                        <Form>
                            <Form.Input value={naziv} onChange={setInputState(setNaziv)} label='Naziv' />
                            <Form.Dropdown
                                value={zanrovi}
                                onChange={setDropDownState(setZanrovi)}
                                selection
                                label='Zanr'
                                clearable
                                multiple
                                options={props.zanrovi.map(element => {
                                    return {
                                        key: element.id,
                                        value: element.id,
                                        text: element.naziv
                                    }
                                })}
                            />
                            <Form.Dropdown
                                value={autori}
                                onChange={setDropDownState(setAutori)}
                                selection
                                label='Autor'
                                clearable
                                multiple
                                options={props.autori.map(element => {
                                    return {
                                        key: element.id,
                                        value: element.id,
                                        text: element.ime + ' ' + element.prezime
                                    }
                                })}
                            />
                        </Form>

                    </Grid.Column>
                    <Grid.Column width='1'>

                    </Grid.Column>
                    <Grid.Column width='10'>
                        {
                            filtriraneKnjige.length === 0 ? (
                                <Header textAlign='center'>
                                    Ne postoji knjiga sa zadatim kriterijumima
                                </Header>
                            ) : (
                                <Grid >
                                    {
                                        filtriraneKnjige.slice((aktivnaStrana - 1) * 4, aktivnaStrana * 4).map(element => {
                                            return (
                                                <KnjigaHomeCard key={element.id} knjiga={element} />
                                            )
                                        })
                                    }
                                    <Grid.Row>
                                        <Pagination

                                            totalPages={Math.ceil(filtriraneKnjige.length / 4)}
                                            activePage={aktivnaStrana}
                                            onPageChange={(e, data) => {
                                                setAktivnaStrana(Number(data.activePage))
                                            }}
                                        />
                                    </Grid.Row>
                                </Grid>
                            )
                        }

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
