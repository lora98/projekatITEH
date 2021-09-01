

import React, { useState } from 'react'
import { Header } from 'semantic-ui-react'
import { Autor, Knjiga, KnjigaDTO, Zanr } from '../model'
import { onRowClick } from '../util'
import KnjigaForma from './KnjigaForma'
import KnjigeTabela from './KnjigeTabela'

interface Props {
    knjige: Knjiga[],
    zanrovi: Zanr[],
    autori: Autor[],
    izmeni: (knjiga: KnjigaDTO, id: number) => Promise<void>,
    kreiraj: (data: FormData) => Promise<void>,
    obrisi: (id: number) => Promise<void>
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
            <KnjigaForma obrisi={async () => {
                await props.obrisi(aktivnaKnjigaId)
                setAktivnaKnjigaId(0);
            }} onSubmit={async (data) => {
                if (aktivnaKnjigaId === 0) {
                    props.kreiraj(data)
                } else {
                    props.izmeni(data, aktivnaKnjigaId).then(() => {
                        setAktivnaKnjigaId(0);
                    })
                }
            }} autori={props.autori} knjiga={props.knjige.find(e => e.id === aktivnaKnjigaId)} zanrovi={props.zanrovi} />
        </div>
    )
}
