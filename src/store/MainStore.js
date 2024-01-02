import { defineStore } from "pinia";
import { validateField } from "@/plugins/validator";

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
        loader: false
    }),
    actions: {
        closeModal(elem) {
            if (elem.classList.contains("modal")) {
                this.popup = "";
            }
        },
        setInputs(key, value) {
            const res = validateField(key, value);
            this.inputs[key] = res.message;
            this.errors = this.errors.filter(elem => elem.id !== key);
            if (res.error) {
                this.errors.push(res);
            }
        }
    }
})