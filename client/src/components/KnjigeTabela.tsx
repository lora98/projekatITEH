import React from 'react'
import { Table } from 'semantic-ui-react'
import { Knjiga } from '../model'
interface Props {
    knjige: Knjiga[],
    aktivna: number,
    onRowClick: (val: number) => void
}
export default function KnjigeTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv</Table.HeaderCell>
                    <Table.HeaderCell>Zanr</Table.HeaderCell>
                    <Table.HeaderCell>Cena</Table.HeaderCell>
                    <Table.HeaderCell>Broj strana</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.knjige.map(element => {
                        return <Table.Row key={element.id} active={props.aktivna === element.id} onClick={() => {
                            props.onRowClick(element.id || 0);
                        }} >
                            <Table.Cell>{element.naziv}</Table.Cell>
                            <Table.Cell>{element.zanr.naziv}</Table.Cell>
                            <Table.Cell>{element.cena}</Table.Cell>
                            <Table.Cell>{element.brojStrana}</Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}
