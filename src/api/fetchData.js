import api from './ApiConstrants';


const fetchApi = () => {
    const config = {
        header: {
            headers: { 'Content-Type': 'application/json' }
        }
    }
    return api.get('movies.json', {}, config);
}

const fetchApiWithParams = ({ username, password }) => {
    const config = {
        header: {
            headers: { 'Content-Type': 'application/json' }
        }
    }
    const body = JSON.stringify({
        UserName: username,
        Password: password
    });
    return api.get('movies.json', body, config);
}

export {
    fetchApi,
    fetchApiWithParams
}