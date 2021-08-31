

import React from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { Knjiga } from '../model'
import { SERVER } from '../util';

interface Props {
    getKnjiga: (id: number) => Knjiga | undefined,
    dodajUKorpu: (id: number) => void

}

export default withRouter(function KnjigaPrikaz(props: Props & RouteComponentProps) {
    const id = Number((props.match.params as any).id);
    const knjiga = props.getKnjiga(id);



    if (!knjiga) {
        return <Redirect to='/' />
    }
    const autori = (!knjiga.autori || knjiga.autori.length === 0) ? 'Nepoznat' : (knjiga.autori.reduce((acc, element) => {
        return acc + element.ime + ' ' + element.prezime + ', '
    }, '').slice(0, -2)) + ''

    return (
        <div>
            <div className='slikaPozadina'>

            </div>
            <Grid container columns='16'>
                <Grid.Row >
                    <Grid.Column width='12'>
                        <Header textAlign='center'>
                            <h1>{knjiga.naziv}</h1>

                        </Header>
                        <p>
                            {`Zanr: ${knjiga.zanr.naziv}`}
                        </p>
                        <p>
                            {` Autori: ${autori}`}
                        </p>
                        <p>
                            Broj strana: {knjiga.brojStrana}
                        </p>
                        <p>
                            Cena: {knjiga.cena}
                        </p>
                        <p>
                            {
                                knjiga.fajl ? (
                                    <a href={`${SERVER}/uploads/${knjiga.fajl}`} target='_blank' rel='noreferrer'>Vidi</a>
                                ) : (
                                    <p>
                                        Nema fajl
                                    </p>
                                )
                            }
                        </p>
                        <Header>
                            <h3>Opis</h3>
                        </Header>
                        <p>
                            {knjiga.opis}
                        </p>
                        <Button color='vk' onClick={() => {
                            props.dodajUKorpu(id)
                        }}>Dodaj u korpu</Button>
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Image src={`${SERVER}/uploads/${knjiga.slika}`} fluid />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}
)