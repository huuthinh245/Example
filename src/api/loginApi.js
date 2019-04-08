import api from './ApiConstrants';

export const fetchApi = ({ username, password }) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(progressEvent.loaded);
        }
    }
    const body = JSON.stringify({
        userName: username,
        password
    });
    return api.post('rest/LPortal/action/post/login.rest', body, config);
}
