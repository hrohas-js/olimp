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
  },
  item: {
    type: Object,
    default: () => ({})
  }
});

const width = computed(() =>mainStore.display_width);
</script>

<template>
  <article class="announcementItem">
    <a
        :href="props.item.link"
        target="_blank"
    >
      <div class="image">
        <!--      <sub-items-status
                  :text="props.statusText"
                  :relevance="props.relevanceText"
              />-->
        <img
            :src="props.item.src"
            :alt="props.item.title"
        />
      </div>
      <section class="content">
        <header class="announcementItem__header">
          <h3 class="subItemTitle">
            {{ props.item.title }}
          </h3>
          <p class="subItemText">
            {{ props.item.description }}
          </p>
        </header>
      </section>
    </a>
  </article>
</template>

<style scoped lang="scss">
.announcementItem {
  padding-top:rem(10);
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
      height: rem(177);
      width: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: rem(10) rem(5) rem(10);
  }

  &__header {
    p {
      padding-top: rem(5);
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
    width: 30%;
    .image {
      flex: 1 1 45%;

      img {
        height: rem(80);
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