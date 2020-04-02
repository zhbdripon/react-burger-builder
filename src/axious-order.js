import axious from 'axios';

const instance = axious.create({
    baseURL: 'https://react-my-burger-94fdc.firebaseio.com/'
})

export default instance;