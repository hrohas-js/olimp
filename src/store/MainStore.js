import { defineStore } from "pinia";
import { validateField } from "@/plugins/validator";
import { AnotherServicesApi } from "@/api/AnotherServices/AnotherServicesApi";
import { useCatalogStore } from "@/store/CatalogStore";

export const useMainStore = defineStore("mainStore", {
    state: () => ({
        display_width: 0,
        someItem: "technics",
        popup: "",
        inputs: {
            id: "",
            name: "",
            last_name: "",
            second_name: "",
            email: "",
            phone: "",
            password: "",
            old_password: "",
            confirm_password: "",
            city: "",
            street: "",
            flat: "",
            floor: "",
            entrance: "",
            house: "",
            birth_datetime: "",
            avatar_url: ""
        },
        errors: [],
        loader: false,
        miniChat: false,
        location: '',
        country: '',
        marker: {
            coordinates: [37.617644, 55.755819]
        }
    }),
    actions: {
        clearInputs() {
            this.inputs = {
                id: "",
                name: "",
                last_name: "",
                second_name: "",
                email: "",
                phone: "",
                password: "",
                old_password: "",
                confirm_password: "",
                city: "",
                street: "",
                flat: "",
                floor: "",
                entrance: "",
                house: "",
                birth_datetime: "",
                avatar_url: ""
            }
        },
        closeModal(elem) {
            const catalogStore = useCatalogStore();
            if (elem.classList.contains("modal")) {
                this.popup = "";
                catalogStore.showModalFilters = false;
                catalogStore.showModalSubCategories = false;
            }
        },
        setInputs(key, value) {
            const res = validateField(key, value);
            this.inputs[key] = res.message;
            this.errors = [...this.errors].filter(elem => elem.id !== key);
            if (res.error) {
                this.errors.push(res);
            }
        },
        upperCase(str){
            return str[0].toUpperCase() + str.slice(1);
        },
        async fetchCLADR(str) {
            try {
                const response = await AnotherServicesApi.fetchCLADR(str);
                console.log(response);
            } catch (error) {
                console.log(error)
            }
        },
        async fetchMap(mode, coords) {
            try {
                const response = await AnotherServicesApi.fetchMap(coords);
                if (mode === 'coordinates') {
                    response.response.GeoObjectCollection.featureMember.forEach(elem => {
                        if (elem.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'locality') {
                            this.location = elem.GeoObject.name;
                        }
                        if (elem.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'country') {
                            this.country = elem.GeoObject.name;
                        }
                    });
                } else {
                    this.marker = {...this.marker, coordinates: response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number)}
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchCoords() {
            try {
                await AnotherServicesApi.fetchCoords().then((response) => {
                    this.marker.coordinates = [response.lon, response.lat];
                    this.fetchMap('coordinates', `${response.lon}, ${response.lat}`)
                });
            } catch (error) {
                console.log(error)
            }
        }
    }
})