import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Card, Container, Image } from 'semantic-ui-react';

export default function RandomSlika() {

    const [url, setUrl] = useState('');
    const ucitaj = () => {
        axios.get('https://picsum.photos/1200/720', {
            withCredentials: false
        }).then(res => {

            setUrl(res.request.responseURL)
        })
    }
    useEffect(() => {
        ucitaj();
    }, [])


    if (url === '') {
        return null
    }
    return (

        <>
            <Image src={url} />


            <Button fluid className='marginButton' primary onClick={ucitaj}>Nova slika</Button>

        </>

    )
}
