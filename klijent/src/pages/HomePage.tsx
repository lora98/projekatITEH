
import React from 'react'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import KnjigaCard from '../components/KnjigaCard'
import { Knjiga } from '../model'


interface Props {
    knjige: Knjiga[]
}

export default function HomePage(props: Props) {
    return (
        <div className='' >
            <div className='pocetnaSlika'>

            </div>
            <Container className='marginTop-very '>
                <Header textAlign='center'>
                    <h1>Dobrodosli na sajt nase biblioteke</h1>
                </Header>
                <Segment basic className='marginTop-very '>
                    <Header textAlign='center'>
                        <h3>Pogledajte neke od nasih knjiga</h3>
                        <br />
                    </Header>
                    <Grid columns='16'>
                        {
                            props.knjige.map(element => {
                                return (
                                    <KnjigaCard knjiga={element} key={element.id} />
                                )
                            })
                        }
                    </Grid>
                </Segment>
                <br />
                <br />
            </Container>
        </div>
    )
}
