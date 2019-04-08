import { create } from 'apisauce';


const api = create({
    baseURL: "http://rems.dfm-engineering.com/api/v1/",
    timeout: 20000
});

export const mapApi = (page) => {
    console.log(page);
    const config = {
            headers: { 'Content-Type': 'application/json' }
    }

    return api.get(`realty?page=${page}`, {}, config);
}