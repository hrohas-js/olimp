import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import {AnnouncementApi} from "@/api/Announcement/AnnouncementApi";
import {ElMessage} from "element-plus";

export const useAnnouncementStore = defineStore("announcementStore", {
    state: () => ({
        newItem: {
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
                this.newItem.gallery = response.gallery;
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
                    this.newItem.gallery = this.newItem.gallery.filter(elem => elem.src !== data.url);
                } else {
                    ElMessage.error('При удалении изображения произошла ошибка');
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
                            type: 'success'
                        });
                    } else {
                        ElMessage({
                            message: 'Ваше объявление сохранено в черновики!',
                            type: 'success'
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
                        type: 'success'
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
    }
});