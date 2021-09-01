import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function DashboardMenu() {
    return (
        <Menu vertical borderless fluid secondary>
            <Menu.Item header>Meni</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/knjige'>Knjige</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/korpe'>Korpe</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/slika'>Random slika</Menu.Item>
        </Menu>
    )
}
