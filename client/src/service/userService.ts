import axios from 'axios'
import { User } from '../model';
import { SERVER } from '../util';
axios.defaults.withCredentials = true;

export async function checkUser() {
    const res = await axios.get(SERVER + '/check');
    return res.data as User;
}

export async function loginUser(email: string, password: string) {
    const res = await axios.post(SERVER + '/login', { email, password })
    return res.data as User;
}

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
    const res = await axios.post(SERVER + '/register', {
        firstName,
        lastName,
        email,
        password
    })
    return res.data as User;

}

export function logoutUser() {
    return axios.post(SERVER + '/logout')
}