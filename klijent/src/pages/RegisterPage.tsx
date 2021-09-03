import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Form, Header, Segment } from 'semantic-ui-react'
import { setInputState } from '../util';
export interface Props {
    onSubmit: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
}
export default withRouter(function RegisterPage(props: Props & RouteComponentProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('')
    const [repepatError, setRepepatError] = useState('')
    return (
        <Segment>
            <Header textAlign='center'>Registracija korisnika</Header>
            <Form onSubmit={() => {
                if (password !== repeat) {
                    setRepepatError('Sifre nisu iste');
                    return;
                }
                setRepepatError('');
                props.onSubmit(firstName, lastName, email, password)
            }}>
                <Form.Input required value={firstName} onChange={setInputState(setFirstName)} label='Ime' />
                <Form.Input required value={lastName} onChange={setInputState(setLastName)} label='Prezime' />
                <Form.Input required value={email} onChange={setInputState(setEmail)} label='Email' type='email' />
                <Form.Input required value={password} onChange={setInputState(setPassword)} label='Sifra' type='password' />
                <Form.Input required value={repeat} error={repepatError || undefined} onChange={setInputState(setRepeat)} label='Ponovite sifru' type='password' />
                <Form.Button primary fluid>Registrujte se</Form.Button>
            </Form>
        </Segment>
    )
}
)