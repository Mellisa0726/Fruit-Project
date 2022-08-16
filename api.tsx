import axios from 'axios';

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
                window.localStorage.setItem('JWT', res.data.jwt);
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
    }
};