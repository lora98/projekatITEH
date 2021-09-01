

import React from 'react';
import { Table } from 'semantic-ui-react';
import { Korpa } from '../model';

interface Props {
    korpe: Korpa[],
    aktivna: number,
    onRowClick: (ind: number) => void
}

export default function KorpeTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Korsinik</Table.HeaderCell>
                    <Table.HeaderCell>Adresa</Table.HeaderCell>
                    <Table.HeaderCell>Broj telefona</Table.HeaderCell>
                    <Table.HeaderCell>Iznos</Table.HeaderCell>
                    <Table.HeaderCell>Stanje</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.korpe.map((element, index) => {
                        return (
                            <Table.Row key={element.id} active={index === props.aktivna} onClick={() => {
                                props.onRowClick(index);
                            }}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.user.firstName + ' ' + element.user.lastName}</Table.Cell>
                                <Table.Cell>{element.adresa}</Table.Cell>
                                <Table.Cell>{element.telefon}</Table.Cell>
                                <Table.Cell>{element.stavke.reduce((acc, element) => {
                                    return acc + element.kolicina * element.knjiga.cena;
                                }, 0)}</Table.Cell>
                                <Table.Cell>{element.poslata ? 'Poslata' : 'U obradi'}</Table.Cell>

                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
