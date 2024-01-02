import {BaseApi} from "@/api/BaseApi";

export class AuthApi extends BaseApi {
    static headers = {
        'Content-Type': 'application/json'
    }
    static async register(data) {
        return this.doRequest({
            method: "POST",
            url: "/auth/register",
            data: data,
            headers: this.headers
        })
    }
    static async auth(data) {
        return this.doRequest({
            method: "POST",
            url: "/auth/getToken",
            data: data,
            headers: this.headers
        })
    }
}