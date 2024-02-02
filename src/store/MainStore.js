import { defineStore } from "pinia";
import { validateField } from "@/plugins/validator";
import { AnotherServicesApi } from "@/api/AnotherServices/AnotherServicesApi";
import { useCatalogStore } from "@/store/CatalogStore";
import jsonp from 'jsonp';
import {SendMessageApi} from "@/api/SendMessage/SendMessageApi";
import {ElMessage} from "element-plus";

export const useMainStore = defineStore("mainStore", {
    state: () => ({
        info: [
            {
                src: 'https://productioncity.pro/photos/anons/anons1.jpg',
                link: 'https://dzen.ru/a/YWbXnJcRuDvTHoEC',
                title: 'Хочу снимать кино.',
                description: 'Как стать режиссером и что для этого нужно.'
            },
            {
                src: 'https://productioncity.pro/photos/anons/anons2.jpg',
                link: 'https://www.nur.kz/family/self-realization/1838273-kak-stat-modelu-sovety-instrukcia/',
                title: 'Как стать моделью:',
                description: '12 советов для тех, кто хочет блистать на подиуме и обложках журналов.'
            },
            {
                src: 'https://productioncity.pro/photos/anons/anons3.jpg',
                link: 'https://www.profguide.io/professions/Kaskador.html',
                title: 'Профессия –Каскадер',
                description: ''
            },
            {
                src: 'https://productioncity.pro/photos/anons/anons4.jpg',
                link: 'https://www.gazetametro.ru/articles/kak-popast-v-kino-bez-obrazovanija-i-chto-nuzhno-delat-chtoby-stat-vostrebovannym-akterom-13-08-2022',
                title: 'Как попасть в кино без образования и что нужно делать, что бы стать востребованным актёром.',
                description: ''
            },
            {
                src: 'https://productioncity.pro/photos/anons/anons5.jpg',
                link: 'https://dzen.ru/a/Xi4aRRbvkACthhCY',
                title: 'Работа на съемочной площадке',
                description: 'Мечта или наказание.'
            },
            {
                src: 'https://productioncity.pro/photos/anons/anons6.jpg',
                link: 'https://studref.com/466104/marketing/rabochee_vremya_vremya_otdyha_kinostudiyah',
                title: 'Рабочее время и время отдыха на киностудиях',
                description: ''
            }
        ],
        videoReviews: [
            {
                player: `<iframe width="100%" src="https://www.youtube.com/embed/F8cpvjj1otA?si=KJ3zKuKEYgbAmj7C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                title: 'КАК ПОПАСТЬ В КИНО - КАК СТАТЬ АКТЕРОМ БЕЗ ОБРАЗОВАНИЯ'
            },
            {
                player: `<iframe width="100%" src="https://www.youtube.com/embed/dRc2As1xbTc?si=DkMEGPOUxnqBSDoM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                title: 'КАК СТАТЬ МОДЕЛЬЮ | ПОШАГОВЫЙ ПЛАН К ДЕЙСТВИЮ'
            },
            {
                player: `<iframe width="100%" src="https://www.youtube.com/embed/dQgoo8RvekU?si=qKXvDeND92x-VYhk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                title: 'МУЖСКОЙ МОДЕЛИНГ: Через что проходят парни?'
            },
            {
                player: `<iframe width="100%" src="https://www.youtube.com/embed/djF2Lw1K274?si=sfwxtNFQ_g-Artx5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                title: '10 КУЛЬТОВЫХ РЕЖИССЕРОВ БЕЗ ОБРАЗОВАНИЯ'
            },
            {
                player: `<iframe width="100%" src="https://www.youtube.com/embed/cYAwu0V0avY?si=ezQQCJjUf_G87aM_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                title: 'КАК РАБОТАЕТ МУЗЫКА В КИНО. Полное руководство'
            }
        ],
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
        },
        CLADR: []
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
        upperCase(str) {
            if (str) {
                return str[0].toUpperCase() + str.slice(1);
            } else {
                return '';
            }
        },
        async fetchCLADR(str) {
            const url = 'https://kladr-api.ru/api.php?token=EkT8i2ktHQaK7YZEQfde9Ed9aAyEb5ZN&contentType=city&query=' + str;
            jsonp(url, null, (err, response) => {
                if (err) {
                    console.error(err);
                } else {
                    this.CLADR = response.result;
                }
            });
        },
        async fetchCoords() {
            const url = 'http://ip-api.com/json/';
            jsonp(url, null, (err, response) => {
                if (err) {
                    console.error(err);
                } else {
                    this.marker.coordinates = [response.lon, response.lat];
                    this.fetchMap('coordinates', `${response.lon}, ${response.lat}`)
                }
            });
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
        async sendEmailRequest(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await SendMessageApi.sendMessage(data);
                console.log(response)
                ElMessage({
                    type: 'success',
                    message: 'Ваше обращение зарегистрировано. Ожидайте ответа на указанный вами Email.',
                    duration: 6000
                });
            } catch (error) {
                console.log(error)
                ElMessage({
                    type: 'error',
                    message: 'Что-то пошло не так, попробуйте позже!',
                    duration: 6000
                });
            } finally {
                mainStore.loader = false;
            }
        },
    }
})