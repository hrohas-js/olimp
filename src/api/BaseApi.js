import { api, kladr, map, coords } from '@/boot/axios';

export class BaseApi {
    static getJWT () {
        return localStorage.getItem('jwt');
    }
    static async doRequest(config) {
        const response = await api(config);
        return response.data;
    }
    static async doCLADRRequest(config) {
        const response = await kladr(config);
        return response.data;
    }
    static async doMapRequest(config) {
        const response = await map(config);
        return response.data;
    }
    static async doCoordsRequest(config) {
        const response = await coords(config);
        return response.data;
    }
}
