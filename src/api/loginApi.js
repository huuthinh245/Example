import api from './ApiConstrants';

export const fetchApi = ({ username, password }) => {
    console.log(username);
    const config = {
        header: {
            headers: { 'Content-Type': 'application/json' }
        }
    }
    const body = JSON.stringify({
        userName: username,
        password
    });
    return api.post('rest/LPortal/action/post/login.rest', body, config);
}