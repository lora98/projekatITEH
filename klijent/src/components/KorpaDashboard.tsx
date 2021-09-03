

import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Korpa } from '../model';
import { posalji } from '../service/korpaService';
import KorpaPrikaz from './KorpaPrikaz';
import KorpeTabela from './KorpeTabela';

export default function KorpaDashboard() {
    const [korpe, setKorpe] = useFetch<Korpa>('/korpa');
    const [aktivnaKorpa, setAktivnaKorpa] = useState(-1);

    const korpa = (aktivnaKorpa === -1) ? undefined : korpe[aktivnaKorpa];

    const onRowClick = (ind: number) => {
        setAktivnaKorpa(prev => {
            if (prev === ind) {
                return -1;
            }
            return ind;
        })
    }

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
        <div>
            <KorpeTabela korpe={korpe} aktivna={aktivnaKorpa} onRowClick={onRowClick} />
            {
                aktivnaKorpa !== -1 && (
                    <KorpaPrikaz korpa={korpe[aktivnaKorpa]} posalji={() => {
                        posaljiKorpu(korpa?.id);
                    }} />
                )
            }
        </div>
    )
}
