import {BaseApi} from "@/api/BaseApi";

export class ProfileApi extends BaseApi {
    static async editProfileData(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/user/editProfileInfo",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    static async uploadAvatar(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/user/uploadAvatar",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async getAnnouncementOfUser(data) {
        const token = this.getJWT();
        return this.doRequest({
            method: "POST",
            url: "/requests/getAnnouncementOfUser",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
}