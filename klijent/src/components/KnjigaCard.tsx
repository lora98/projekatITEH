

import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Card, Grid, Header, Image } from 'semantic-ui-react'
import { Knjiga } from '../model'
import { SERVER } from '../util'
interface Props {
    knjiga: Knjiga
}
export default withRouter(function KnjigaHomeCard(props: Props & RouteComponentProps) {
    return (

        <Grid.Row as={Card} link onClick={() => {
            props.history.push(`/knjiga/${props.knjiga.id}`)
        }}>
            <Grid.Column width='4'>
                <Image src={`${SERVER}/uploads/${props.knjiga.slika}`} fluid />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width='6'>


                <Header>{props.knjiga.naziv}</Header>
                <span>Zanr: {props.knjiga.zanr.naziv}</span>
            </Grid.Column>
        </Grid.Row>

    )
}
)