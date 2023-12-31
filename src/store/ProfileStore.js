import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {ElMessage} from "element-plus";
import {ProfileApi} from "@/api/Profile/ProfileApi";
import {ChatsApi} from "@/api/Chats/ChatsApi";

export const useProfileStore = defineStore("profileStore", {
    state: () => ({
        content: "profileInfo",
        navigationMobile: false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
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
        myAnnouncements: [],
        myLikes: localStorage.getItem('myLikes') !== null ? localStorage.getItem('myLikes') : [],
        myChats: [],
        currentChatID: 0,
        currentChat: []
    }),
    getters: {
        userMainLetter: (state) => {
            let letter = '';
            if (state.user.name !== '') {
                letter = state.user.name[0].toUpperCase();
            }
            return letter;
        },
        fullAddress: (state) => {
            let address = '';
            if (state.user.city) address += state.user.city;
            if (state.user.street) address += ', ' + state.user.street;
            if (state.user.house) address += ', ' + state.user.house;
            if (state.user.flat) address += ', ' + state.user.flat;
            return address;
        },
        myActiveAnnouncements: (state) => {
            if (state.myAnnouncements.length > 0) {
                return state.myAnnouncements.filter(elem => elem.status === 'publish');
            } else {
                return []
            }
        },
        myArchiveAnnouncements: (state) => {
            if (state.myAnnouncements.length > 0) {
                return state.myAnnouncements.filter(elem => elem.status === 'archive');
            } else {
                return []
            }
        },
        myDraftAnnouncements: (state) => {
            if (state.myAnnouncements.length > 0) {
                return state.myAnnouncements.filter(elem => elem.status === 'draft');
            } else {
                return []
            }
        }
    },
    actions: {
        clearStore() {
            // Обновление простых свойств
            this.content = "profileInfo";
            this.navigationMobile = false;
            this.currentChatID = 0;

            // Сброс объекта user
            this.user = {
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
            };

            // Сброс массивов
            this.myAnnouncements = [];
            this.myLikes = [];
            this.myChats = [];
            this.currentChat = [];
        },
        async editProfileInfo() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.editProfileData(mainStore.inputs);
                if (response.result) {
                    this.user = response.user;
                    mainStore.inputs = response.user;
                    localStorage.setItem('user', JSON.stringify(response.user));
                    ElMessage({
                        message: 'Данные успешно обновлены!',
                        type: 'success',
                    });
                    mainStore.popup = '';
                } else if (response.error) {
                    ElMessage.error(response.message);
                } else {
                    ElMessage.error('При обновлении даннных произошла ошибка! Повторите попытку позже.');
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async uploadAvatar(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.uploadAvatar(data);
                this.user.avatar_url = response.url;
                localStorage.setItem('user', JSON.stringify(this.user));
                console.log(response);
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getAnnouncementOfUser(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getAnnouncementOfUser(data);
                this.myAnnouncements = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getLikes() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getLikes({
                    id: this.user.id
                });
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async addLike(data) {
            try {
                const response = await ProfileApi.addLike(data);
                this.myLikes = response.result;
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async removeLike(data) {
            try {
                const response = await ProfileApi.removeLike(data);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async getAllChats(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ChatsApi.getAllChats(data);
                console.log(response)
                this.myChats = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getChat(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ChatsApi.getChat(data);
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getMessages(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ChatsApi.getMessages(data);
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async sendMessage(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ChatsApi.sendMessage(data);
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        }
    }
})