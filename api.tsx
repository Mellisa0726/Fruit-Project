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
};