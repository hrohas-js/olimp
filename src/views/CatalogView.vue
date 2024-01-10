<script setup>
import GoodItem from "@/components/Goods/GoodItem";
import AdvertisingItem from "@/components/Advertising/AdvertisingItem";
import Filter from "@/components/UI/Filters/Filter";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import CatalogSubCategories from "@/components/NavigationComponents/CatalogSubCategories";
import {useMainStore} from "@/store/MainStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";

const mainStore = useMainStore();
const catalogStore = useCatalogStore();
const route = useRoute();
const router = useRouter();

const title = ref('');

const width = computed(() => mainStore.display_width);
const categories = computed(() => catalogStore.categories);
const subCategories = computed(() => catalogStore.subCategories);
const catalog = computed(() => catalogStore.filteredCatalog);

watch(route, () => {
  checkPageTitle();
});

onMounted(() => {
  checkPageTitle();
});


const checkPageTitle = () => {
  categories.value.forEach(elem => {
    if (elem.id === parseInt(route.params.category)) {
      title.value = elem.name;
    }
  });
  catalogStore.getSubCategories(route.params.category);
  if (route.params.subCategory) {
    catalogStore.getFilters(route.params.subCategory).then(() => {
      subCategories.value.forEach(elem => {
        if (elem.id === parseInt(route.params.subCategory)) {
          title.value = elem.name.replaceAll('<br>', ' ');
        }
      });
    });
  }
}

const goToProduct = (param = "") => {
  router.push("/cartPage");
  mainStore.someItem = param
}

const showSubcategories = () => {
  catalogStore.showModalSubCategories = true
}

const showFilters = () => {
  catalogStore.showModalFilters = true;
}
</script>

<template>
  <section class="catalogView wrapper textMontserrat">
    <search-header/>
    <div class="categoryName">
      <h2 class="textMontserrat_medium">
        {{ title }}
      </h2>
    </div>
    <main class="catalogView__main" v-if="width > 1024">
      <div class="catalogView__content">
        <div v-if="route.params.subCategory === 'all'" class="subCategories">
          <catalog-sub-categories :category-items="subCategories" />
        </div>
        <section class="main">
          <aside
              v-if="route.params.subCategory !== 'all'"
              class="left"
          >
            <Filter/>
          </aside>
          <section
              :class="{
                'mainCatalog': route.params.subCategory === 'all',
                'goodItemContainer': catalog.length > 0,
                'catalogEmpty': catalog.length === 0
              }"
          >
            <good-item
                v-for="item in catalog"
                :key="item.id"
                :item="item"
            />
            <p
                v-if="catalog.length === 0"
                class="textMontserrat_semiBold"
            >
              Предложений пока нет...
            </p>
          </section>
        </section>
      </div>
      <aside class="right">
        <advertising-item/>
      </aside>
    </main>
    <section
        v-if="width <= 1024"
        class="catalogView_mobile"
    >
      <div
          class="showSubCategoriesButton background_blackLight color_colorBg"
          @click="showSubcategories"
      >
        Категории
      </div>
      <main
          class="catalogView__main-mobile"
          v-if="width <= 1024"
      >
        <div
            v-if="route.params.subCategory !== 'all'"
            class="burgerMenu"
            @click="showFilters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
            <path d="M1 5H19" stroke="black" stroke-linecap="round"/>
            <path d="M7.49023 10H19.0002" stroke="black" stroke-linecap="round"/>
            <path d="M1 10H3.99" stroke="black" stroke-linecap="round"/>
            <path d="M1 15H19" stroke="black" stroke-linecap="round"/>
            <circle cx="19" cy="5" r="5" fill="#E9605A"/>
          </svg>
          <p class="textMontserrat_light">
            Фильтры
          </p>
        </div>
        <section class="goodItemContainer">
          <good-item
              v-for="item in catalog"
              :key="item.id"
              :item="item"
          />
          <p
              v-if="catalog.length === 0"
              class="textMontserrat_semiBold"
          >
            Предложений пока нет...
          </p>
        </section>
      </main>
    </section>
  </section>
</template>

<style scoped lang="scss">
.textMontserrat {
  &_semiBold {
    font-size: rem(18);
  }
}

.catalogView {
  &__main{
    display:flex;
    gap:rem(10);
  }
  &__content{
    flex:1 1 85%;

    .catalogEmpty {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .main {
    gap: rem(10);
    .left {
      flex: 0 0 20%;
      //width: rem(300);
    }
  }

  .goodItemContainer {
    flex: 1 1 65%;
  }


  .subCategories {
    margin-bottom: rem(32);
   //max-width: 82%;
  }

  @media (max-width: em(1024, 16)) {
    .burgerMenu {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: rem(6);
      margin-bottom: rem(30);

      .textMontserrat_light {
        font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (1024 - 390)));
      }
    }
    .goodsContainer {
      margin-top: rem(30);
    }
    .subCategories {
      max-width: 100%;
    }
  }

  @media (max-width: em(1024, 16)) {
    .catalogView_mobile{
      .showSubCategoriesButton{
        cursor:pointer;
        max-width: rem(100);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

</style>