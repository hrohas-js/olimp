import {BaseApi} from "@/api/BaseApi";

export class ChatsApi extends BaseApi {
    static async getChat(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/getChat",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getChatsCategories(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/get_chat_categories",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setImportant(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/setImportant",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setDownImportant(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/setDownImportant",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setBlacklist(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/setBlacklist",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setDownBlacklist(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/setDownBlacklist",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async remove(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/remove",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getMessages(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/getMessages",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getAllChats(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/all",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async sendMessage(data) {
        return this.doRequest({
            method: "POST",
            url: "/chat/sendMessage",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
}