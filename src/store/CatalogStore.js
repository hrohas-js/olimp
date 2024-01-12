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
        createdCategories: [],
        filterParams: {
            age: {
                from: 0,
                to: 0
            },
            sex: {},
            type: {},
            selectedSex: {},
            selectedType: {}
        }
    }),
    getters: {
        modelFlag: (state) => {
            let res = false;
            if ((state.filterID.id === 30 || state.filterID.id === 51) && state.filterContentID.id === 6) {
                res = true
            }
            return res;
        },
        actorFlag: (state) => {
            let res = false;
            if ((state.filterID.id === 30 || state.filterID.id === 51) && (state.filterContentID.id === 1 || state.filterContentID.id === 2)) {
                res = true
            }
            return res;
        },
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
                if (state.filterID.name === 'Актеры, актрисы, модели,\n' + 'артисты ориг. жанра,\n' + 'агенты' &&
                    (state.filterContentID.name === 'Актеры' || state.filterContentID.name === 'Актрисы' || state.filterContentID.name === 'Модели')
                ) {

                }
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
                    if (elem.id === 108 || elem.id === 109) {
                        this.filterParams.sex = {
                            id: elem.id,
                            name: elem.name,
                            catID: elem.sub_category_id,
                            content: JSON.parse(elem.content)
                        }
                    } else if (elem.id === 110 || elem.id === 111) {
                        this.filterParams.type = {
                            id: elem.id,
                            name: elem.name,
                            catID: elem.sub_category_id,
                            content: JSON.parse(elem.content)
                        }
                    } else {
                        this.filters.push({
                            id: elem.id,
                            name: elem.name,
                            catID: elem.sub_category_id,
                            content: JSON.parse(elem.content)
                        });
                    }
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