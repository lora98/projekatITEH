import React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router'
import { Grid, Header } from 'semantic-ui-react'
import DashboardMenu from '../components/DashboardMenu'
import KnjigeDashboard from '../components/KnjigeDashboard'
import KorpaDashboard from '../components/KorpaDashboard'
import { Autor, Knjiga, Zanr } from '../model'

interface Props {
    knjige: Knjiga[],
    zanrovi: Zanr[],
    autori: Autor[]
}

export default withRouter(function Dashboard(props: Props & RouteComponentProps) {
    return (
        <Grid columns='16' padded>
            <Grid.Column width='2'>
                <DashboardMenu />
            </Grid.Column>
            <Grid.Column width='13'>
                <Switch>
                    <Route path={`${props.match.path}/knjige`}>
                        <KnjigeDashboard autori={props.autori} zanrovi={props.zanrovi} knjige={props.knjige} />
                    </Route>
                    <Route path={`${props.match.path}/korpe`}>
                        <KorpaDashboard />
                    </Route>
                    <Route path={`${props.match.path}/`}>
                        <Header textAlign='center'>
                            <h1>Kontrolna tabla</h1>
                        </Header>
                    </Route>
                </Switch>
            </Grid.Column>
        </Grid>
    )
}
)