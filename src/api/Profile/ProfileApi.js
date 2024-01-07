import {BaseApi} from "@/api/BaseApi";

export class ProfileApi extends BaseApi {
    static async editProfileData(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/editProfileInfo",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async uploadAvatar(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/uploadAvatar",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async getAnnouncementOfUser(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/getAnnouncementOfUser",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getLikes(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/getLikes",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async addLike(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/addLike",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async removeLike(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/removeLike",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
}