import React, { useState } from 'react';
import { Button, Form, Grid, Header, Input, Pagination, Table } from 'semantic-ui-react';
import { Stavka } from '../model';
import { setInputState } from '../util';


interface Props {
    stavke: Stavka[],
    obrisiStavku: (id: number) => void,
    izmeniStavku: (stavka: Stavka, kolicina: number) => void,
    naruci: (telefon: string, adresa: string) => Promise<void>
}

export default function KorpaPage(props: Props) {
    const [aktivnaStrana, setAktivnaStrana] = useState(1);
    const [adresa, setAdresa] = useState('');
    const [telefon, setTelefon] = useState('')



    return (
        <Grid container columns='16'>
            <Grid.Row>
                <Grid.Column width='16'>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Knjiga</Table.HeaderCell>
                                <Table.HeaderCell>Cena</Table.HeaderCell>
                                <Table.HeaderCell>Kolicina</Table.HeaderCell>
                                <Table.HeaderCell>Ukupno</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.stavke.slice((aktivnaStrana - 1) * 4, aktivnaStrana * 4).map(element => {
                                    return (
                                        <Table.Row key={element.knjiga.id}>
                                            <Table.Cell>{element.knjiga.naziv}</Table.Cell>
                                            <Table.Cell>{element.knjiga.cena}</Table.Cell>
                                            <Table.Cell>
                                                <Input min='1' type='number' value={element.kolicina} onChange={(e) => {
                                                    const value = e.currentTarget.value;
                                                    props.izmeniStavku(element, Number(value));
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell>{element.kolicina * element.knjiga.cena}</Table.Cell>

                                            <Table.Cell>
                                                <Button negative icon='remove' onClick={() => {
                                                    props.obrisiStavku(element.knjiga.id!)
                                                }} />
                                            </Table.Cell>
                                        </Table.Row>)
                                })
                            }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    <Pagination
                                        totalPages={Math.ceil(props.stavke.length / 4)}
                                        activePage={aktivnaStrana}
                                        onPageChange={(e, data) => {
                                            setAktivnaStrana(Number(data.activePage))
                                        }}
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Ukupno
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    {props.stavke.reduce((acc, element) => {
                                        return acc + element.kolicina * element.knjiga.cena
                                    }, 0)}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column width='10'>
                    <Header textAlign='center'>
                        <h3>
                            Popunite podatke za kupovinu
                        </h3>
                    </Header>
                    <Form onSubmit={() => {
                        props.naruci(telefon, adresa).then(() => {
                            alert('uspesno ste narucili')
                        })

                    }}>
                        <Form.Input required value={adresa} onChange={setInputState(setAdresa)} label='Adresa' />
                        <Form.Input required value={telefon} onChange={setInputState(setTelefon)} label='Broj telefona' />
                        <Form.Button disabled={props.stavke.length === 0} primary fluid >Naruci</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
