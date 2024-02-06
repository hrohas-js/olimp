<script setup>
import {useCatalogStore} from "@/store/CatalogStore";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {useMainStore} from "@/store/MainStore";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";

const catalogStore = useCatalogStore();
const announcementStore = useAnnouncementStore();
const mainStore = useMainStore();
const router = useRouter();

const width = computed(() => mainStore.display_width);
const categories = computed(() => catalogStore.createdCategories);
const subCategories = computed(() => catalogStore.subCategories);
const filters = computed(() => catalogStore.filters);
const newItemCategories = computed(() => announcementStore.newItem.categories);

const subFlag = ref(false);
const mobileCategoriesShowFlag = ref(true);
const mobileSubCategoriesShowFlag = ref(false);

onMounted(() => {
  catalogStore.subCategories = [];
  catalogStore.filters = [];
  announcementStore.newItem.categories = [];
});

const getCategoriesTree = (slug, category, filter = null) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  switch (slug) {
    case 'category':
      catalogStore.subCategories = [];
      catalogStore.filters = [];
      if (category.name === 'Работа') {
        subFlag.value = true;
        if (announcementStore.newItem.selectedCategories.length > 0) {
          announcementStore.newItem.selectedCategories = [];
        }
        announcementStore.newItem.selectedCategories.push(category.name);
      } else {
        catalogStore.currentCategory = category;
        catalogStore.getSubCategories(category.id);
        if (announcementStore.newItem.categories.length > 0) {
          announcementStore.newItem.categories = [];
        }
        announcementStore.newItem.categories.push({
          id: category.id,
          name: category.name
        });
        if (category.title && announcementStore.newItem.selectedCategories.length === 2) {
          announcementStore.newItem.selectedCategories[1] = category.title;
        } else if (category.title) {
          announcementStore.newItem.selectedCategories.push(category.title);
        } else if (announcementStore.newItem.selectedCategories.length > 0) {
          announcementStore.newItem.selectedCategories = [];
          announcementStore.newItem.selectedCategories.push(category.name);
        }
        mobileSubCategoriesShowFlag.value = true;
        if (width.value < 768) {
          mobileCategoriesShowFlag.value = false;
        }
      }
      break;
    case 'subCategory':
      catalogStore.filters = [];
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
      if (width.value < 768) {
        mobileSubCategoriesShowFlag.value = false;
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
      if (announcementStore.newItem.selectedCategories.length === 3) {
        announcementStore.newItem.selectedCategories[2] = category.name;
      } else {
        announcementStore.newItem.selectedCategories.push(category.name);
      }
      router.push('/postAdvertisements/create');
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
      <nav
          v-if="mobileCategoriesShowFlag"
          class="create__navigation border border_subBgOpacity"
      >
        <p class="textMontserrat_bold">
          Категории:
        </p>
        <ul class="textMontserrat_regular">
          <li
              v-for="category in categories"
              :key="category.id"
              class="cats"
              :class="{'active': category.id === newItemCategories[0]?.id && category.id !== 0}"
              @click.stop="getCategoriesTree('category', category)"
          >
            <span v-html="category.name" />
            <svg
                v-if="category.subs"
                height="12px"
                width="12px"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 185.343 185.343"
                xml:space="preserve"
                :class="{'rotate': subFlag}"
            >
              <g>
                <g>
                  <path style="fill:#010002;" d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                    l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                    c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"/>
                </g>
              </g>
            </svg>
            <ul
                v-if="category.subs && subFlag"
                class="subs"
            >
              <li
                  v-for="item in category.subs"
                  :key="item.id"
                  :class="{'active': item.id === newItemCategories[0]?.id}"
                  @click.stop="getCategoriesTree('category', item)"
              >
                {{ item.title }}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <transition name="fade">
        <nav
            v-if="subCategories.length > 0 && mobileSubCategoriesShowFlag"
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
                @click.stop="getCategoriesTree('subCategory', subCategory)"
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
            <ul
                v-if="filter.name !== 'Пол' && filter.name !== 'Стиль'"
                class="textMontserrat_regular"
            >
              <li
                  v-for="param in filter.content"
                  :key="param.id"
                  :class="{'active': param.id === newItemCategories[3]?.id}"
                  @click.stop="getCategoriesTree('filter', param, filter)"
              >
                {{ param.name }}
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

    @media (max-width: em(768, 16)) {
      flex: 0 0 100%;
    }

    p, li {
      padding: rem(12) rem(10) rem(10);
    }
    p {
      font-size: rem(16);
    }
    li {
      cursor: pointer;
      position: relative;

      svg {
        position: absolute;
        top: rem(15);
        right: rem(15);
        transition: transform 0.3s;
      }

      .rotate {
        transform: rotate(90deg);
      }

      .subs {
        padding-left: rem(30);

        li {
          padding: rem(5);
          font-size: rem(14);
        }
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