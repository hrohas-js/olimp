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
    static async checkAuth() {
        return this.doRequest({
            method: "GET",
            url: "/auth/validateToken",
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async resetPassword(data) {
        return this.doRequest({
            method: "POST",
            url: "/auth/resetPassword",
            data: data,
            headers: this.headers
        })
    }
}