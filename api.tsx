import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const hostname = 'https://rn-backend-app.herokuapp.com/api/v1';

export const api = {
    logIn(name: string, password: string) {
        return (
            axios.post(hostname + '/user/login', {
                'name': name,
                'password': password
            })
            .then(res => {
                // console.log(res);
                SecureStore.setItemAsync('JWT', res.data.jwt);
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
    getBoundingBox(image: File) {
        return (
            axios.post('https://judycpc.pythonanywhere.com/', {
                image: image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
        )
    }
};