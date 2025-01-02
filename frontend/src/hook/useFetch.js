import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) console.log('accessToken not present in localstorage');

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
},
    (error) => {
        console.log('Request Error:', error);
        return Promise.reject(error);
    }

);


// Handle expired token 
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const origionalReq = error.config;
        if(error.response && error.response.status === 401 && !origionalReq._retry){
            origionalReq._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                if(!refreshToken) console.log('refreshToken not present in localstorage');
                const response = await axios.post('/users/refresh-token', {token: refreshToken});

                console.log('useFetch res: ', response)
                localStorage.setItem('accessToken', response.data.data.accessToken);

                api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`

                return api(origionalReq);

            } catch (error) {
                console.log('Token refresh failed: ', error);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);


export default api