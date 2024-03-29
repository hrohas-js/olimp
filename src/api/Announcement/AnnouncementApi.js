import {BaseApi} from "@/api/BaseApi";

export class AnnouncementApi extends BaseApi {
    static async getParameters(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/get_parameters",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async uploadGallery(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/uploadGallery",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async removeFromGallery(data) {
        return this.doRequest({
            method: "POST",
            url: "/user/removeFromGallery",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async createAnnouncement(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/addAnnouncement",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async editAnnouncement(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/editAnnouncement",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setAnnouncementViews(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/setAnnouncementViews",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async setAnnouncementContacts(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/setAnnouncementContacts",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async changeAnnouncementStatus(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/changeAnnouncementStatus",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async getUserOfAnnouncement(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/getUserOfAnnouncement",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async removeAnnouncement(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/removeAnnouncement",
            data: data,
            headers: {
                Authorization: `Bearer ${this.getJWT()}`,
                'Content-Type': 'application/json'
            }
        })
    }
}