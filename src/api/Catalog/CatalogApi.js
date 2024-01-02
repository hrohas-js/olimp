import {BaseApi} from "@/api/BaseApi";

export class CatalogApi extends BaseApi {
    static async getCategories() {
        return this.doRequest({
            method: "GET",
            url: "/requests/get_categories"
        })
    }
    static async getSubCategories(id) {
        return this.doRequest({
            method: "GET",
            url: "/requests/get_sub_categories?category_id=" + id
        })
    }
    static async getFilters(id) {
        return this.doRequest({
            method: "GET",
            url: "/requests/get_filters?sub_category_id=" + id
        })
    }
    static async getAnnouncements() {
        return this.doRequest({
            method: "GET",
            url: "/requests/getAnnouncements"
        })
    }
}
