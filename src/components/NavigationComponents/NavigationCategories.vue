<script setup>
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useCatalogStore} from "@/store/CatalogStore";

const route = useRoute();
const router = useRouter();
const catalogStore = useCatalogStore();

const categories = computed(() => catalogStore.categories);
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
          :class="{active: parseInt(route.params.category) === category.id}"
      >
        <router-link :to="`/catalog/${category.id}/all`">
          <p class="textMontserrat_semiBold color_black">
            {{ category.name }}
          </p>
          <div class="image">
            <img
                :src="category.img"
                :alt="category.name"
            />
          </div>
        </router-link>
      </li>
      <li
          class="background_mainBg"
          style="opacity: 0.5"
      >
        <p class="textMontserrat_semiBold soon">
          Скоро...
        </p>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.soon {
  text-align: center;
}
.navigationCategories {
  ul {
    display: grid;
    gap: rem(16);
    flex-wrap: wrap;
    li{
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
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