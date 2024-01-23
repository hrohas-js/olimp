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
    static async getNotifications() {
        return this.doRequest({
            method: "POST",
            url: "/requests/getNotifications",
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getLikesCategories(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/get_likes_categories",
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
    static async getSellAnnouncements(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/getSellAnnouncements",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async uploadChatImage(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/uploadChatImage",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async addReview(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/addReview",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getReviews(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/getReviews",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
}