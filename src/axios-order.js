import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-94fdc.firebaseio.com/'
})

export default instance;