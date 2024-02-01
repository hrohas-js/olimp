import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import {AnnouncementApi} from "@/api/Announcement/AnnouncementApi";
import {ElMessage} from "element-plus";
import {AnotherServicesApi} from "@/api/AnotherServices/AnotherServicesApi";

export const useAnnouncementStore = defineStore("announcementStore", {
    state: () => ({
        editID: 0,
        newItem: localStorage.getItem('newItem') !== null ? JSON.parse(localStorage.getItem('newItem')) : {
            title: '',
            description: '',
            categories: [],
            price: '0',
            parameters: [],
            gallery: [],
            location: '',
            phone: '',
            selectedParameters: [],
            status: '',
            communication: '',
            marker: {
                coordinates: [37.617644, 55.755819]
            },
            video: '',
            selectedCategories: []
        }
    }),
    actions: {
        async getParameters(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.getParameters(data);
                this.newItem.parameters = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async uploadGallery(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.uploadGallery(data);
                response.gallery.forEach(elem => {
                    this.newItem.gallery.push(elem);
                });
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async removeFromGallery(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.removeFromGallery(data);
                if (response.result) {
                    this.newItem.gallery = [...this.newItem.gallery].filter(elem => elem.src !== data.url);
                } else {
                    ElMessage({
                        type: 'error',
                        message: 'При удалении изображения произошла ошибка',
                        duration: 6000
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async createAnnouncement(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.createAnnouncement(data);
                console.log(response);
                if (response.result) {
                    if (data.status === 'publish') {
                        ElMessage({
                            message: 'Ваше объявление опубликовано!',
                            type: 'success',
                            duration: 6000
                        });
                    } else {
                        ElMessage({
                            message: 'Ваше объявление сохранено в черновики!',
                            type: 'success',
                            duration: 6000
                        });
                    }
                    this.newItem = {
                        title: '',
                        description: '',
                        categories: [],
                        price: '0',
                        parameters: [],
                        gallery: [],
                        location: '',
                        phone: '',
                        selectedParameters: [],
                        status: ''
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async editAnnouncement(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.editAnnouncement(data);
                if (response.result) {
                    ElMessage({
                        message: 'Изменения сохранены!',
                        type: 'success',
                        duration: 6000
                    });
                    this.newItem = {
                        title: '',
                        description: '',
                        categories: [],
                        price: '0',
                        parameters: [],
                        gallery: [],
                        location: '',
                        phone: '',
                        selectedParameters: [],
                        status: ''
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async setAnnouncementViews(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                await AnnouncementApi.setAnnouncementViews(data);
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async changeAnnouncementStatus(data) {
            const mainStore = useMainStore();
            const profileStore = useProfileStore();
            let russianStatus = '';
            switch (data.status) {
                case 'publish':
                    russianStatus = 'Активные';
                    break;
                case "archive":
                    russianStatus = 'Архив';
                    break;
                case "draft":
                    russianStatus = 'Черновик';
                    break;
            }
            try {
                mainStore.loader = true;
                const response = await AnnouncementApi.changeAnnouncementStatus(data);
                if (response.result) {
                    await profileStore.getAnnouncementOfUser(data);
                    ElMessage({
                        message: 'Объявление перемещено в раздел ' + russianStatus,
                        type: 'success',
                        duration: 6000
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async fetchMap(mode, coords) {
            try {
                const response = await AnotherServicesApi.fetchMap(coords);
                if (mode === 'coordinates') {
                    response.response.GeoObjectCollection.featureMember.forEach(elem => {
                        if (elem.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'locality') {
                            this.newItem.location = elem.GeoObject.metaDataProperty.GeocoderMetaData.text.replace('Россия, ', '');
                        }
                    });
                } else {
                    this.newItem.marker = {...this.marker, coordinates: response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number)}
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchCoords() {
            try {
                await AnotherServicesApi.fetchCoords().then((response) => {
                    this.newItem.marker.coordinates = [response.lon, response.lat];
                    this.fetchMap('coordinates', `${response.lon}, ${response.lat}`)
                });
            } catch (error) {
                console.log(error)
            }
        }
    }
});