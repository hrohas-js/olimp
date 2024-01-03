import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {CatalogApi} from "@/api/Catalog/CatalogApi";

export const useCatalogStore = defineStore("catalogStore", {
    state: () => ({
        categories: [],
        subCategories: [],
        title : '',
        showModalSubCategories: false,
        currentCategory: localStorage.getItem('currentCategory') !== null ? parseInt(localStorage.getItem('currentCategory')) : {},
        filters: [],
        catalog: [],
        subCategoryID: {},
        filterID: {},
        filterContentID: {},
        search: ''
    }),
    getters: {
        currentCategoryName: (state) => {
            let res = '';
            state.categories.forEach(elem => {
                if (elem.id === state.currentCategory.id) res = elem.name;
            });
            return res;
        },
        filteredCatalog: (state) => {
            let res = [];
            if (state.currentCategory.id !== 0) {
                res = state.catalog.filter(elem => {
                    const cats = JSON.parse(elem.categories);
                    return cats[0].id === state.currentCategory.id;
                });
            } else {
                return state.catalog;
            }
            if (state.subCategoryID.id !== 0) {
                res = res.filter(elem => {
                    const cats = JSON.parse(elem.categories);
                    return cats[1].id === state.subCategoryID.id;
                });
            }
            if (state.filterID.id !== 0 && state.filterContentID.id !== 0) {
                res = res.filter(elem => {
                    const cats = JSON.parse(elem.categories);
                    return cats[2].id === state.filterID.id && cats[3].id === state.filterContentID.id;
                });
            }
            return res;
        },
        searchCatalog: (state) => {
            if (state.search.length === 0) return state.catalog;
            const srch = state.search.toLowerCase();
            return state.catalog.filter(elem => elem.title.toLowerCase().indexOf(srch) !== -1);
        }
    },
    actions: {
        async getCategories() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getCategories();
                this.categories = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getSubCategories() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getSubCategories(this.currentCategory.id);
                this.subCategories = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getFilters(id) {
            const mainStore = useMainStore();
            this.filters = [];
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getFilters(id);
                response.result.forEach(elem => {
                    this.filters.push({
                        id: elem.id,
                        name: elem.name,
                        catID: elem.sub_category_id,
                        content: JSON.parse(elem.content)
                    });
                });
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getAnnouncements() {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getAnnouncements();
                this.catalog = response.result;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
    }
})