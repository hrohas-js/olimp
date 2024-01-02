<script setup>
import SubItemsStatus from "@/components/UI/SubItemsStatus";
import {computed} from "vue";
import {useMainStore} from "@/store/MainStore";

const mainStore = useMainStore();

const props = defineProps({
  statusText: {
    type: String,
    default() {
      return "";
    }
  },
  relevanceText: {
    type: String,
    default() {
      return ""
    }
  }
});

const width = computed(() =>mainStore.display_width);
</script>

<template>
  <article class="announcementItem">
    <div class="image">
      <sub-items-status
          :text="props.statusText"
          :relevance="props.relevanceText"
      />
      <img src="@/assets/png/AnnouncementItem/announcementItem.png" alt="Актерские пробы">
    </div>
    <section class="content">
      <header class="announcementItem__header">
        <h3 class="subItemTitle">
          Актерские пробы
        </h3>
        <p class="subItemText">
          Кастинг актеров
        </p>
      </header>
      <main class="announcementItem__main">
        <p
            v-if="width > 1024"
            class="subItemText"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua...
        </p>
        <p class="subItemTextPrice">
          Гонорар: 170000 руб.
        </p>
      </main>
      <footer
          v-if="width > 1024"
          class="announcementItem__footer"
      >
        <p class="subItemText">
          Город: Москва
        </p>
        <time class="subItemText" datatype="21.09.2023">
          Прием заявок до: 21.09.2023
        </time>
      </footer>
      <footer
          v-if="width <= 1024"
          class="announcementItem__footer"
      >
        <p class="subItemText color_accent">
          Смотреть
        </p>
        <svg fill="#000000" height="18px" width="18px" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 330 330" xml:space="preserve">
            <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	          c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	          C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	          C255,161.018,253.42,157.202,250.606,154.389z"/>
            </svg>
      </footer>
    </section>
  </article>
</template>

<style scoped lang="scss">
.announcementItem {
  cursor: pointer;
  border-bottom: 1px solid #ebebeb;

  .image {
    position: relative;

    .subItemStatus {
      position: absolute;
      right: 0;
      top: 12px;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: rem(18) rem(5) rem(23);
  }

  &__header {
    p {
      padding-top: rem(20);
    }
  }

  &__main {
    padding: rem(10) rem(0);

    .subItemText {
      font-size: rem(14);
    }

    .subItemTextPrice {
      font-size: rem(16);
      padding-top: rem(10);
    }
  }

  &__footer {
    p:first-child {
      padding-bottom: rem(15);
    }
  }

  @media (max-width: em(1024, 16)) {
    display: flex;
    width: calc(330rem / 16 + (500 - 330) * ((100vw - 390rem / 16) / (1024 - 390)));
    max-width: 100%;
    .image {
      flex: 1 1 45%;

      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      flex: 1 1 65%;
      padding: rem(4) rem(10);
    }
    &__header p {
      padding: 0;
    }
    &__main {
      padding: 0;

      .subItemTextPrice {
        padding: 0;
        margin-top: rem(12);
        font-size: rem(14);
      }
    }

    &__footer {
      display: flex;
      gap: rem(8);
      margin-top: rem(11);

      p {
        font-size: rem(14);

        &:first-child {
          padding: 0;
        }
      }

      svg {
        path {
          fill: $color_accent;
        }
      }
    }
  }
}
</style>