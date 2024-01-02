import { api } from '@/boot/axios';

export class BaseApi {
    static getJWT () {
        return localStorage.getItem('jwt');
    }
    static async doRequest(config) {
        const response = await api(config);
        return response.data;
    }
}
