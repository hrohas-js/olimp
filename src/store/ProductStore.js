import { defineStore } from "pinia";
import {useMainStore} from "@/store/MainStore";
import {AnnouncementApi} from "@/api/Announcement/AnnouncementApi";
import {AnotherServicesApi} from "@/api/AnotherServices/AnotherServicesApi";

export const useProductStore = defineStore("productStore", {
    state: () => ({
        productID: 0,
        author: localStorage.getItem('author') !== null ? localStorage.getItem('author') : '',
        marker: {
            coordinates: [37.617644, 55.755819]
        }
    }),
    actions: {
        async getUserOfAnnouncement(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.getUserOfAnnouncement(data);
                this.author = response.result.name;
                localStorage.setItem('author', response.result.name);
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async fetchMap(loc) {
            try {
                const response = await AnotherServicesApi.fetchMap(loc);
                console.log(response);
                this.marker = {...this.marker, coordinates: response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number)}
            } catch (error) {
                console.log(error)
            }
        },
    }
})