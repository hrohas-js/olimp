import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {ElMessage} from "element-plus";
import {ProfileApi} from "@/api/Profile/ProfileApi";
import {ChatsApi} from "@/api/Chats/ChatsApi";

export const useProfileStore = defineStore("profileStore", {
    state: () => ({
        content: "myAnnouncements",
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
            avatar_url: "",
            avarage_rating: 0.0,
            total_reviews: 0
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
        sellsRelevance: 'active',
        selectedMessages: [],
        currentChatImageUploaded: '',
        myReviews: [],
        idForDelete: 0
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
            this.content = "myAnnouncements";
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
                avatar_url: "",
                avarage_rating: 0.0,
                total_reviews: 0
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
            this.selectedMessages = [];
            this.currentChatImageUploaded = '';
            this.myReviews = [];
            this.idForDelete = 0;
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
                        duration: 6000
                    });
                    mainStore.popup = '';
                } else if (response.error) {
                    ElMessage({
                        message: response.message,
                        type: 'error',
                        duration: 6000
                    });
                } else {
                    ElMessage({
                        message: 'При обновлении даннных произошла ошибка! Повторите попытку позже.',
                        type: 'error',
                        duration: 6000
                    });
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
                await ProfileApi.addLike(data);
            } catch (error) {
                console.log(error);
            }
        },
        async removeLike(data) {
            try {
                await ProfileApi.removeLike(data);
            } catch (error) {
                console.log(error);
            }
        },
        async getAllChats(data) {
            try {
                const response = await ChatsApi.getAllChats(data);
                this.myChats = response.result;
            } catch (error) {
                console.log(error);
            }
        },
        async getChat(data) {
            try {
                const response = await ChatsApi.getChat(data);
                this.currentChat = response.result[0];
            } catch (error) {
                console.log(error);
            }
        },
        async getChatsCategories(data) {
            try {
                const response = await ChatsApi.getChatsCategories(data);
                this.chatCategories = response.result;
            } catch (error) {
                console.log(error);
            }
        },
        async getMessages(data) {
            try {
                const response = await ChatsApi.getMessages(data);
                console.log(response);
                this.currentChatHistory = response.result;
            } catch (error) {
                console.log(error);
            }
        },
        async sendMessage(data) {
            try {
                await ChatsApi.sendMessage(data);
            } catch (error) {
                console.log(error);
            }
        },
        async getNotifications() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.getNotifications();
                this.notifications = response.result;
                if (localStorage.getItem('not_count') === null) localStorage.setItem('not_count', this.notifications.length.toString());
            } catch (error) {
                console.log(error);
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
                console.log(error);
            } finally {
                mainStore.loader = false;
            }
        },
        async setImportant() {
            try {
                await ChatsApi.setImportant({
                    query: this.selectedMessages.join(',')
                });
                this.selectedMessages = [];
            } catch (error) {
                console.log(error);
            }
        },
        async setDownImportant() {
            try {
                await ChatsApi.setDownImportant({
                    query: this.selectedMessages.join(',')
                });
                this.selectedMessages = [];
            } catch (error) {
                console.log(error);
            }
        },
        async setBlacklist() {
            try {
                await ChatsApi.setBlacklist({
                    query: this.selectedMessages.join(','),
                    creator_id: this.user.id
                });
                this.selectedMessages = [];
            } catch (error) {
                console.log(error);
            }
        },
        async setDownBlacklist() {
            try {
                await ChatsApi.setDownBlacklist({
                    query: this.selectedMessages.join(','),
                    creator_id: this.user.id
                });
                this.selectedMessages = [];
            } catch (error) {
                console.log(error);
            }
        },
        async remove() {
            try {
                await ChatsApi.remove({
                    query: this.selectedMessages.join(',')
                });
                this.selectedMessages = [];
            } catch (error) {
                console.log(error);
            }
        },
        async uploadChatImage(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await ProfileApi.uploadChatImage(data);
                this.currentChatImageUploaded = response.url;
            } catch (error) {
                console.log(error);
            } finally {
                mainStore.loader = false;
            }
        },
        async addReview(data) {
            try {
                const response = await ProfileApi.addReview(data);
                if (response.result) {
                    ElMessage({
                        type: 'success',
                        message: 'Отзыв успешно добавлен',
                        duration: 6000
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getReviews() {
            try {
                const response = await ProfileApi.getReviews({
                    id: this.user.id
                });
                this.myReviews = response.result;
            } catch (error) {
                console.log(error);
            }
        }
    }
})