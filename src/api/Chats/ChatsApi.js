import {BaseApi} from "@/api/BaseApi";

export class ChatsApi extends BaseApi {
    static async getChat(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/chat/getChat",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getMessages(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/chat/getMessages",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getAllChats(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/chat/all",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async sendMessage(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/chat/sendMessage",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
}