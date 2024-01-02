<script setup>
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useCatalogStore} from "@/store/CatalogStore";

const route = useRoute();
const router = useRouter();
const catalogStore = useCatalogStore();

const categories = computed(() => catalogStore.categories);

const changeRoute = (category) => {
  catalogStore.currentCategory = category.id;
  localStorage.setItem('currentCategory', category.id);
  catalogStore.title = category.name;
  catalogStore.getSubCategories();
  router.push(`/catalog/${category.slug}/all`);
}
</script>

<template>
  <nav class="navigationCategories">
    <ul :class="{
       'indexPage': route.name  === 'home',
       'anotherPage': route.name  !== 'home'
    }">
      <li
          v-for="category in categories"
          :key="category.id"
          class="background_mainBg"
          :class="{active: route.params.category === category.slug}"
          @click="changeRoute(category)"
      >
        <p class="textMontserrat_semiBold">
          {{ category.name }}
        </p>
        <div class="image">
          <img
              :src="category.img"
              :alt="category.name"
          />
        </div>
      </li>
      <li
          class="background_mainBg"
          style="opacity: 0.5"
      >
        <p class="textMontserrat_semiBold">
          Скоро...
        </p>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navigationCategories {
  ul {
    display: grid;
    gap: rem(16);
    flex-wrap: wrap;
    li{
      .image {
        flex: 0 0 20%;
        height: 100%;
        display: flex;
        align-items: flex-end;
      }
    }
  }

  .indexPage {
    grid-template-columns:repeat(5, minmax(220px, 300px));
    justify-content: center;
  }

  .anotherPage {
    grid-template-columns:repeat(5, minmax(135px, 165px));
    gap: rem(10);
  }


  @media (max-width: em(1024, 16)) {
    .indexPage{
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      justify-content: start;
    }
    ul {
      li {
        &:hover {
          background: $color_bg;
        }
      }
      &::-webkit-scrollbar{
        display: none;
      }
    }
  }

  @media (max-width: em(768, 16)) {
    ul {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      justify-content: start;

      li {
        flex-shrink: 0;
        height: fit-content;
        //flex-direction: column;
        align-items: center;
        //min-width: 220px;
        //
        //.image {
        //  order: 1;
        //}
        //
        //p {
        //  order: 2;
        //}
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>