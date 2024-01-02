<script setup>
import {useMainStore} from "@/store/MainStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {useRouter, useRoute} from "vue-router";
import {computed, onMounted} from "vue";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
const catalogStore = useCatalogStore();

const props = defineProps({
  categoryItems: {
    type: Array,
    default: []
  }
});

const width = computed(() => mainStore.display_width);
const title = computed(() => catalogStore.title);

onMounted(() => {
  if (width.value > 768) {
    dynamicHeightLi();
  }
})

const closeModal = () => {
  catalogStore.showModalSubCategories = false
}

const changeSubCategory = (subCategory) => {
  router.push({
    name: "catalog",
    params: {
      category: route.params.category,
      subCategory: subCategory.slug
    }
  })
  if (width.value <= 768) {
    closeModal();
  }
  catalogStore.subCategoryID = subCategory.id;
  catalogStore.getFilters(subCategory.id);
  document.querySelector('.main').scrollIntoView({
    behavior: 'smooth'
  });
};

const dynamicHeightLi = () => {
  const li = document.querySelectorAll('.catalogSubCategories__category');
  let liHeight = 0;
  for (let i = 0; i < li.length; i++) {
    if (li[i].offsetHeight > liHeight) {
      liHeight = li[i].offsetHeight;
    }
  }
  for (let i = 0; i < li.length; i++) {
    li[i].style.height = liHeight + 'px';
  }
}
</script>

<template>
  <nav
      :class="{
        'catalogSubCategories':width > 768,
        'catalogSubCategories_mobile': width <= 768
      }"
  >
    <ul :class="{'background_elements categoriesContainer': width <= 768}">
      <div
          v-if="width <= 768"
          class="close"
          @click="closeModal"
      >
        <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
              fill="black"/>
        </svg>
      </div>
      <header
          v-if="width <= 768"
          class="catalogSubCategories_mobile__header color_black textMontserrat_bold"
      >
        {{ title }}
      </header>
      <li
          class="catalogSubCategories__category"
          :class="{'color_black':width <= 768}"
          v-for="category in categoryItems"
          :key="category.id"
          @click="changeSubCategory(category)"
      >
        <p
            v-html="category.name"
            class="textMontserrat_medium catalogSubCategories__name"
        />
        <sub class="textMontserrat_regular">
          7
        </sub>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.catalogSubCategories {
  padding-top: rem(20);
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: rem(10);
  }

  &__category {
    cursor: pointer;
    max-width: rem(353);
    display: flex;
    align-items: center;
    gap: rem(5);
  }

  &__name {
    font-size: rem(14);
  }
}

@media (max-width: em(768, 16)) {
  .categoriesContainer {
    padding: 7% 3%;
    position: relative;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .catalogSubCategories_mobile__header {
    text-align: center;
    margin-bottom: rem(20);
  }
}
</style>