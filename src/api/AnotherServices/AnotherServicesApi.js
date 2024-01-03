import {BaseApi} from "@/api/BaseApi";

export class AnotherServicesApi extends BaseApi {
    static async fetchCLADR(query) {
        return this.doCLADRRequest({
            method: "GET",
            url: `/api.php?token=EkT8i2ktHQaK7YZEQfde9Ed9aAyEb5ZN&contentType=city&query=${query}`,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
    static async fetchMap(query) {
        return this.doMapRequest({
            method: "GET",
            url: `?apikey=76cfed62-af40-4762-8407-089b55cdeec6&geocode=${query}&format=json`
        })
    }
    static async fetchCoords() {
        return this.doCoordsRequest({
            method: "GET",
            url: '/json/'
        })
    }
}