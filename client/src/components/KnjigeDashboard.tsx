

import React from 'react'
import { useState } from 'react'
import { Header, Table } from 'semantic-ui-react'
import { Autor, Knjiga, Zanr } from '../model'
import { onRowClick } from '../util'
import KnjigaForma from './KnjigaForma'
import KnjigeTabela from './KnjigeTabela'

interface Props {
    knjige: Knjiga[],
    zanrovi: Zanr[],
    autori: Autor[]
}

export default function KnjigeDashboard(props: Props) {
    const [aktivnaKnjigaId, setAktivnaKnjigaId] = useState(0)


    return (
        <div>
            <KnjigeTabela aktivna={aktivnaKnjigaId} onRowClick={onRowClick(setAktivnaKnjigaId)} knjige={props.knjige} />
            <Header textAlign='center'>
                {
                    aktivnaKnjigaId === 0 ? 'Kreiraj knjigu' : 'Izmeni knjigu'
                }
            </Header>
            <KnjigaForma onSubmit={async () => {
                setAktivnaKnjigaId(0);
            }} autori={props.autori} knjiga={props.knjige.find(e => e.id === aktivnaKnjigaId)} zanrovi={props.zanrovi} />
        </div>
    )
}
