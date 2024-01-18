import { defineStore } from "pinia";
import { useMainStore } from "@/store/MainStore";
import { useProfileStore } from "@/store/ProfileStore";
import { AuthApi } from "@/api/Auth/AuthApi";
import { ElMessage } from "element-plus";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        jwt: localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : null
    }),
    actions: {
        async register() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AuthApi.register({
                    name: mainStore.inputs.name,
                    email: mainStore.inputs.email,
                    password: mainStore.inputs.password
                });
                if (response.code === 200 && response.result) {
                    mainStore.popup = 'auth';
                    ElMessage({
                        message: "Регистрация прошла успешно",
                        type: "success"
                    });
                }
            } catch (error) {
                console.log(error)
                ElMessage({
                    type: 'error',
                    message: error.response.data.message,
                    duration: 6000
                });
            } finally {
                mainStore.loader = false;
            }
        },
        async auth() {
            const mainStore = useMainStore();
            const profileStore = useProfileStore();
            try {
                mainStore.loader = true;
                const response = await AuthApi.auth({
                    email: mainStore.inputs.email,
                    password: mainStore.inputs.password
                });
                if (response.error) {
                    ElMessage({
                        type: 'error',
                        message: response.message,
                        duration: 6000
                    });
                } else {
                    mainStore.popup = '';
                    ElMessage({
                        message: "Авторизация прошла успешно",
                        type: "success",
                        duration: 6000
                    });
                    this.jwt = response.access_token;
                    localStorage.setItem('jwt', response.access_token);
                    profileStore.user.id = response.user.id;
                    profileStore.user.name = response.user.name;
                    profileStore.user.email = response.user.email;
                    profileStore.user.phone = response.user.phone;
                    profileStore.user.city = response.user.city;
                    profileStore.user.street = response.user.street;
                    profileStore.user.flat = response.user.flat;
                    profileStore.user.floor = response.user.floor;
                    profileStore.user.entrance = response.user.entrance;
                    profileStore.user.house = response.user.house;
                    profileStore.user.birth_datetime = response.user.birth_datetime;
                    profileStore.user.avatar_url = response.user.avatar_url;
                    profileStore.user.password = '';
                    profileStore.user.old_password = '';
                    profileStore.user.confirm_password = '';
                    localStorage.setItem('user', JSON.stringify(profileStore.user));
                    for (const prop in mainStore.inputs) {
                        mainStore.inputs[prop] = '';
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async checkAuth() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await AuthApi.checkAuth();
                if (response.code !== 200) {
                    localStorage.clear();
                    this.jwt = null;
                }
            } catch (error) {
                console.log(error)
                localStorage.clear();
                this.jwt = null;
                ElMessage({
                    type: 'error',
                    message: 'Сессия пользователя закончена в связи со сменой IP адреса',
                    duration: 6000
                });
            } finally {
                mainStore.loader = false;
            }
        }
    }
})