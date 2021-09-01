

import React, { useState } from 'react';
import { Button, Header, Pagination, Segment, Table } from 'semantic-ui-react';
import { Korpa } from '../model';

interface Props {
    korpa: Korpa,
    posalji: () => void
}

export default function KorpaPrikaz(props: Props) {
    const [aktivnaStrana, setAktivnaStrana] = useState(1);

    return (
        <Segment>
            <Header textAlign='center'>
                <b>Korisnik</b>: {props.korpa.user.firstName + ' ' + props.korpa.user.lastName}
            </Header>
            <Header textAlign='center'>
                <b>Adresa</b>: {props.korpa.adresa}
            </Header>
            <Header textAlign='center'>
                <b>Telefon</b>: {props.korpa.telefon}
            </Header>
            <Header textAlign='center'>
                <b>Status</b>: {props.korpa.poslata ? 'Poslata' : 'U obradi'}
            </Header>
            {
                !props.korpa.poslata && (
                    <Button onClick={props.posalji}>Posalji</Button>
                )
            }
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Knjiga</Table.HeaderCell>
                        <Table.HeaderCell>Cena</Table.HeaderCell>
                        <Table.HeaderCell>Kolicina</Table.HeaderCell>
                        <Table.HeaderCell>Ukupno</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        props.korpa.stavke.slice((aktivnaStrana - 1) * 4, aktivnaStrana * 4).map(element => {
                            return <Table.Row key={element.knjiga.id}>
                                <Table.Cell>{element.knjiga.naziv}</Table.Cell>
                                <Table.Cell>{element.knjiga.cena}</Table.Cell>
                                <Table.Cell>
                                    {element.kolicina}
                                </Table.Cell>
                                <Table.Cell>{element.kolicina * element.knjiga.cena}</Table.Cell>


                            </Table.Row>
                        })
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                totalPages={Math.ceil(props.korpa.stavke.length / 4)}
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
                            {props.korpa.stavke.reduce((acc, element) => {
                                return acc + element.kolicina * element.knjiga.cena
                            }, 0)}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Segment>
    )
}
