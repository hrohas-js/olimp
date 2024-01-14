import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {ElMessage} from "element-plus";
import {ProfileApi} from "@/api/Profile/ProfileApi";
import {ChatsApi} from "@/api/Chats/ChatsApi";
import {getCurrentDateTime} from "@/plugins/validator";

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
        myLikes: localStorage.getItem('myLikes') !== null ? JSON.parse(localStorage.getItem('myLikes')) : [],
        myChats: [],
        currentChat: {},
        currentChatHistory: [],
        chatCategories: [],
        relevance: 0,
        wishCategories: [],
        wishRelevance: 0,
        notifications: [],
        newNotificationsCount: 0,
        mySells: [],
        sellsRelevance: 'active'
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
                return [...state.myAnnouncements].filter(elem => elem.status === 'publish');
            } else {
                return [];
            }
        },
        myArchiveAnnouncements: (state) => {
            if (state.myAnnouncements.length > 0) {
                return [...state.myAnnouncements].filter(elem => elem.status === 'archive');
            } else {
                return [];
            }
        },
        myDraftAnnouncements: (state) => {
            if (state.myAnnouncements.length > 0) {
                return [...state.myAnnouncements].filter(elem => elem.status === 'draft');
            } else {
                return [];
            }
        },
        myFilteredChats: (state) => {
            if (state.relevance !== 0) {
                return [...state.myChats].filter(elem => elem.category_id === state.relevance);
            }
            else {
                return state.myChats;
            }
        },
        myFilteredLikes: (state) => {
            if (state.wishRelevance !== 0) {
                return [...state.myLikes].filter(elem => JSON.parse(elem.categories)[0].id === state.wishRelevance);
            }
            else {
                return state.myLikes;
            }
        },
        myActiveSellsAnnouncements: (state) => {
            if (state.mySells.length > 0) {
                return [...state.mySells].filter(elem => elem.status === 'publish');
            } else {
                return [];
            }
        },
        myArchiveSellsAnnouncements: (state) => {
            if (state.mySells.length > 0) {
                return [...state.mySells].filter(elem => elem.status === 'archive');
            } else {
                return [];
            }
        },
    },
    actions: {
        clearStore() {
            // Обновление простых свойств
            this.content = "profileInfo";
            this.navigationMobile = false;
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
            this.currentChat = {};
            this.currentChatHistory = [];
            this.chatCategories = [];
            this.relevance = 0;
            this.wishCategories = [];
            this.wishRelevance = 0;
            this.notifications = [];
            this.newNotificationsCount = 0;
            this.mySells = [];
            this.sellsRelevance = 'active';
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
        async getLikesCategories(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getLikesCategories(data);
                this.wishCategories = response.result;
                console.log(response)
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
                this.myLikes = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async addLike(data) {
            try {
                const response = await ProfileApi.addLike(data);
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
                this.currentChat = response.result[0];
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getChatsCategories(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ChatsApi.getChatsCategories(data);
                this.chatCategories = response.result;
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
                this.currentChatHistory = response.result;
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
        },
        async getNotifications(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getNotifications(data);
                this.notifications = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async addNotification(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.addNotification(data);
                if (response.result) {
                    this.notifications.push({
                        user_id: this.user.id,
                        dt_created: getCurrentDateTime()
                    });
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getSellAnnouncements() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getSellAnnouncements({
                    user_id: this.user.id
                });
                this.mySells = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        }
    }
})