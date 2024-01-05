<script setup>
import {useCatalogStore} from "@/store/CatalogStore";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";

const catalogStore = useCatalogStore();
const announcementStore = useAnnouncementStore();
const router = useRouter();

const categories = computed(() => catalogStore.createdCategories);
const subCategories = computed(() => catalogStore.subCategories);
const filters = computed(() => catalogStore.filters);
const newItemCategories = computed(() => announcementStore.newItem.categories);

const subFlag = ref(false);

onMounted(() => {
  catalogStore.subCategories = [];
  catalogStore.filters = [];
  announcementStore.newItem.categories = [];
});

const getCategoriesTree = (slug, category, filter = null) => {
  switch (slug) {
    case 'category':
      if (category.name === 'Работа') {
        subFlag.value = true;
      } else {
        catalogStore.currentCategory = category;
        catalogStore.getSubCategories(category.id);
        if (announcementStore.newItem.categories.length === 1) {
          announcementStore.newItem.categories[0] = {
            id: category.id,
            name: category.name
          };
        } else {
          announcementStore.newItem.categories.push({
            id: category.id,
            name: category.name
          });
        }
      }
      break;
    case 'subCategory':
      catalogStore.getFilters(category.id);
      if (announcementStore.newItem.categories.length === 2) {
        announcementStore.newItem.categories[1] = {
          id: category.id,
          name: category.name
        };
      } else {
        announcementStore.newItem.categories.push({
          id: category.id,
          name: category.name
        });
      }
      break;
    case 'filter':
      if (announcementStore.newItem.categories.length === 4) {
        announcementStore.newItem.categories[2] = {
          id: filter.id,
          name: filter.name
        };
        announcementStore.newItem.categories[3] = {
          id: category.id,
          name: category.name
        };
      } else {
        announcementStore.newItem.categories.push({
          id: filter.id,
          name: filter.name
        });
        announcementStore.newItem.categories.push({
          id: category.id,
          name: category.name
        });
      }
      announcementStore.getParameters({
        filter_id: filter.id,
        filter_content_id: category.id
      });
      router.push('/postAdvertisements');
      break;
    default:
      break;
  }
}
</script>

<template>
  <section class="create wrapper textMontserrat">
    <search-header/>
    <div class="categoryName">
      <h1 class="textMontserrat_bold">
        Выберите категорию
      </h1>
    </div>
    <main class="create__main">
      <nav class="create__navigation border border_subBgOpacity">
        <p class="textMontserrat_bold">
          Категории:
        </p>
        <ul class="textMontserrat_regular">
          <li
              v-for="category in categories"
              :key="category.id"
              class="cats"
              @click="getCategoriesTree('category', category)"
          >
            <span v-html="category.name" />
            <ul
                v-if="category.subs && subFlag"
                class="subs"
            >
              <li
                  v-for="item in category.subs"
                  :key="item.id"
                  :class="{'active': item.id === newItemCategories[0]?.id}"
                  @click="getCategoriesTree('category', item)"
              >
                {{ item.title }}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <transition name="fade">
        <nav
            v-if="subCategories.length > 0"
            class="create__navigation border border_subBgOpacity borderLeftNone"
        >
          <p class="textMontserrat_bold">
            Подкатегории:
          </p>
          <ul class="textMontserrat_regular">
            <li
                v-for="subCategory in subCategories"
                :key="subCategory.id"
                v-html="subCategory.name"
                :class="{'active': subCategory.id === newItemCategories[1]?.id}"
                @click="getCategoriesTree('subCategory', subCategory)"
            />
          </ul>
        </nav>
      </transition>
      <transition name="fade">
        <nav
            v-if="filters.length > 0"
            class="create__navigation border border_subBgOpacity borderLeftNone"
        >
          <p class="textMontserrat_bold">
            Параметры:
          </p>
          <div
              v-for="filter in filters"
              :key="filter.id"
              class="filter-group"
          >
            <ul class="textMontserrat_regular">
              <li
                  v-for="param in filter.content"
                  :key="param.id"
                  :class="{'active': param.id === newItemCategories[3]?.id}"
                  @click="getCategoriesTree('filter', param, filter)"
              >
                {{param.name}}
              </li>
            </ul>
          </div>
        </nav>
      </transition>
    </main>
  </section>
</template>

<style scoped lang="scss">
.textMontserrat {
  &_bold {
    font-size: rem(25);
  }
}
.create {
  &__main {
    display: flex;
    max-width: 70%;
    margin: 0 auto;

    @media (max-width: em(768,16)) {
      max-width: 100%;
    }
  }
  &__navigation {
    flex: 0 0 33.333%;
    p, li {
      padding: rem(12) rem(10) rem(10);
    }
    p {
      font-size: rem(16);
    }
    li {
      cursor: pointer;

      .subs {
        padding-left: rem(20);
      }

      &.active,
      &:hover {
        background: $color_blueLikeAvt;
      }

      &.cats:first-child {
        padding: 0;
        span {
          padding: rem(12) rem(10) rem(10);
          display: block;
          &:hover {
            background: $color_blueLikeAvt;
          }
        }
        &.active,
        &:hover{
          background: transparent;
        }
      }
    }
  }
  .borderLeftNone{
    border-left: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>