import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const hostname = 'https://rn-backend-app.herokuapp.com/api/v1';

export const api = {
    logIn(email: string, password: string) {
        return (
            axios.post(hostname + '/user/login', {
                'email': email,
                'password': password
            })
            .then(res => {
                // console.log(res);
                SecureStore.setItemAsync('JWT', res.data.jwt);
            })
        )
    },
    signUp(email: string, password: string) {
        return (
            axios.post(hostname + '/user/signup', {
                'email': email,
                'password': password
            })
        )
    },
    getKnowledge(fruit: string, kid: any) {
        let url: string;
        url = hostname + '/knowledge?fruit=' + fruit;
        if (kid !== undefined)
            url += '/Kid=' + String(kid);

        return (
            axios.get(url)
            .then(res => res.data)
        )
    },
    getRecipe(fruit: string) {
        return (
            axios.get(hostname + '/recipe?fruit=' + fruit)
            .then(res => res.data)
        )
    },
    getBoundingBox(image: any) {
        return (
            axios.post('https://judycpc.pythonanywhere.com/', image, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.data)
        )
    },
    async getCalendar() {
        const jwt = await SecureStore.getItemAsync('JWT');

        return (
            axios.get(hostname + '/calendar', {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            })
            .then(res => res.data)
        )
    },
    async getNotification() {
        const jwt = await SecureStore.getItemAsync('JWT');

        return (
            axios.get(hostname + '/calendar/notification', {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            })
            .then(res => res.data)
        )
    },
    async classify(image: any) {
        const jwt = await SecureStore.getItemAsync('JWT');
        return (
            axios.post(hostname + '/classification', image, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.data)
        )
    },
    async change(old_password: string, new_password: string) {
        const jwt = await SecureStore.getItemAsync('JWT');
        return (
            axios.post(hostname + '/user/password', {
                'old_password': old_password,
                'new_password': new_password
            }, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.data)
            
        )
    },
    async postCalendar(imageURL: string, name: string, source: string, kid: number) {
        const jwt = await SecureStore.getItemAsync('JWT');
        return (
            axios.post(hostname + '/calendar', {
                'imageURL': imageURL,
                'name': name,
                'source': source,
                'kid': kid
            }, {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.data)
        )
    }
};