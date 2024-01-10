import {defineStore} from "pinia";
import {useMainStore} from "@/store/MainStore";
import {CatalogApi} from "@/api/Catalog/CatalogApi";
import {useRoute} from "vue-router";

export const useCatalogStore = defineStore("catalogStore", {
    state: () => ({
        categories: [],
        subCategories: [],
        showModalSubCategories: false,
        showModalFilters: false,
        currentCategory: localStorage.getItem('currentCategory') !== null ? parseInt(localStorage.getItem('currentCategory')) : {},
        filters: [],
        catalog: [],
        subCategoryID: {},
        filterID: {},
        filterContentID: {},
        search: '',
        createdCategories: []
    }),
    getters: {
        currentCategoryName: (state) => {
            let res = '';
            [...state.categories].forEach(elem => {
                if (elem.id === state.currentCategory.id) res = elem.name;
            });
            return res;
        },
        filteredCatalog: (state) => {
            const route = useRoute();
            let res = [];
            if (route.params.category) {
                res = [...state.catalog].filter(elem => {
                    const cats = JSON.parse(elem.categories);
                    return cats[0].id === parseInt(route.params.category);
                });
            } else {
                return state.catalog;
            }
            if (route.params.subCategory !== 'all') {
                res = res.filter(elem => {
                    const cats = JSON.parse(elem.categories);
                    return cats[1].id === parseInt(route.params.subCategory);
                });
            }
            if (Object.keys(state.filterID).length > 0 && Object.keys(state.filterContentID).length > 0) {
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
            return [...state.catalog].filter(elem => elem.title.toLowerCase().indexOf(srch) !== -1);
        }
    },
    actions: {
        async getCategories() {
            const mainStore = useMainStore();
            let arr = [];
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getCategories();
                this.categories = response.result;
                arr = response.result.filter(elem => elem.name !== 'Поиск специалистов');
                arr.forEach(elem => {
                    if (elem.name === 'Работа (вакансии)') {
                        elem.name = 'Работа';
                        elem.subs = [
                            {
                                id: 1,
                                title: 'Соискатель',
                                name: 'Работа (вакансии)'
                            },
                            {
                                id: 2,
                                title: 'Работодатель',
                                name: 'Поиск специалистов'
                            }
                        ];
                    }
                });
                this.createdCategories = arr;
            } catch (error) {
                console.log(error)
            } finally {
                mainStore.loader = false;
            }
        },
        async getSubCategories(data) {
            const mainStore = useMainStore();
            try {
                mainStore.loader = true;
                const response = await CatalogApi.getSubCategories(data);
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