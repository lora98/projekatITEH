

import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { User } from '../model'

interface Props {
    user?: User,
    logout: () => Promise<void>
}

export default withRouter(function Navbar(props: Props & RouteComponentProps) {
    return (
        <Menu borderless fluid >
            {
                props.user ? (
                    <>
                        <Menu.Item header> E biblioteka</Menu.Item>
                        <Menu.Item as={Link} to='/'>Pocetna strana</Menu.Item>
                        <Menu.Item as={Link} to='/knjige'>Pretraga knjiga</Menu.Item>
                        {
                            props.user.isAdmin && (
                                <Menu.Item as={Link} to='/admin'>Kontrolna tabla</Menu.Item>
                            )
                        }
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to='/korpa' icon='cart' />
                            <Menu.Item onClick={() => {
                                props.logout().then(() => {
                                    props.history.push('/')
                                })
                            }}>Odjava</Menu.Item>
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/login'>Login</Menu.Item>
                        <Menu.Item as={Link} to='/register'>Register</Menu.Item>
                    </Menu.Menu>
                )
            }


        </Menu>
    )
})
