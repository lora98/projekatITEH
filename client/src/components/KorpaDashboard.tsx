

import React from 'react'
import { Button, Table } from 'semantic-ui-react';
import useFetch from '../hooks/useFetch'
import { Korpa } from '../model'
import { posalji } from '../service/korpaService';

export default function KorpaDashboard() {
    const [korpe, setKorpe] = useFetch<Korpa>('/korpa');
    const posaljiKorpu = (id?: number) => {
        if (!id) {
            return;
        }
        posalji(id).then(() => {
            setKorpe(prev => {
                return prev.map(element => {
                    if (element.id === id) {
                        return {
                            ...element,
                            poslata: true
                        }
                    }
                    return element;
                })
            })
        })
    }
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Korsinik</Table.HeaderCell>
                    <Table.HeaderCell>Adresa</Table.HeaderCell>
                    <Table.HeaderCell>Broj telefona</Table.HeaderCell>
                    <Table.HeaderCell>Iznos</Table.HeaderCell>
                    <Table.HeaderCell>Stanje</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    korpe.map(element => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.user.firstName + ' ' + element.user.lastName}</Table.Cell>
                                <Table.Cell>{element.adresa}</Table.Cell>
                                <Table.Cell>{element.telefon}</Table.Cell>
                                <Table.Cell>{element.stavke.reduce((acc, element) => {
                                    return acc + element.kolicina * element.knjiga.cena;
                                }, 0)}</Table.Cell>
                                <Table.Cell>{element.poslata ? 'Poslata' : 'U obradi'}</Table.Cell>
                                {
                                    !element.poslata && (
                                        <Table.Cell>
                                            <Button onClick={() => {
                                                posaljiKorpu(element.id);
                                            }}>Posalji</Button>
                                        </Table.Cell>
                                    )
                                }
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
