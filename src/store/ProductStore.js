import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
    state: () => ({
        productID: 0
    })
})