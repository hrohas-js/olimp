import {BaseApi} from "@/api/BaseApi";

export class SendMessageApi extends BaseApi {
    static async sendMessage(data) {
        return this.doRequest({
            method: "POST",
            url: "/requests/sendEmailRequest",
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}