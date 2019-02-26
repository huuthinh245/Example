import { create } from 'apisauce';

const api = create({
    baseURL: "https://mobile-sqhkt.tphcm.gov.vn/LPortalMobileServices-1.0/",
    timeout: 20000
});

export default api;

