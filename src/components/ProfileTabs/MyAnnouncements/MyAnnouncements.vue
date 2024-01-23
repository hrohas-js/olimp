<script setup>
import ActionButton from "@/components/UI/Button/ActionButton";
import {ref, computed, onBeforeMount} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import MyAnnouncementItem from "@/components/ProfileTabs/MyAnnouncements/MyAnnouncementItem";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const relevance = ref("publish");
const actionItem = ref(false);
const actionCheckBox = ref(false);

const width = computed(() => mainStore.display_width);
const user = computed(() => profileStore.user);
const myActiveAnnouncements = computed(() => profileStore.myActiveAnnouncements);
const myArchiveAnnouncements = computed(() => profileStore.myArchiveAnnouncements);
const myDraftAnnouncements = computed(() => profileStore.myDraftAnnouncements);
const currentAnnouncements = computed(() => {
  switch (relevance.value) {
    case "publish":
      return myActiveAnnouncements.value;
    case "archive":
      return myArchiveAnnouncements.value;
    case "draft":
      return myDraftAnnouncements.value;
    default:
      return [];
  }
});

onBeforeMount(() => {
  profileStore.getAnnouncementOfUser({
    user_id: user.value.id
  });
});

const changeActionCheckBox = () => {
  actionCheckBox.value = !actionCheckBox.value
}

const changeTabs = (tab) => {
  relevance.value = tab;
}
</script>

<template>
  <section class="myAnnouncements profileTab">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Мои объявления
      </h2>
    </header>
    <main class="myAnnouncements__main">
      <nav class="profileNavigation">
        <ul>
          <li
              class="profileNavigation__item textMontserrat_bold"
              :class="{'active':relevance === 'publish'}"
              @click="changeTabs('publish')"
          >
            Активные <sup>{{ myActiveAnnouncements.length }}</sup>
          </li>
          <li
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active':relevance === 'archive'}"
              @click="changeTabs('archive')"
          >
            Архив <sup>{{ myArchiveAnnouncements.length }}</sup>
          </li>
          <li
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active':relevance === 'draft'}"
              @click="changeTabs('draft')"
          >
            Черновик <sup>{{ myDraftAnnouncements.length }}</sup>
          </li>
        </ul>
      </nav>
      <!--div
          class="chooseAll"
      >
        <input type="checkbox" id="chooseAll" @change="changeActionCheckBox">
        <label for="chooseAll">Выбрать все</label>
      </div>-->
      <div class="content">
        <my-announcement-item
            v-for="item in currentAnnouncements"
            :key="item.id"
            :item="item"
            :mode="relevance"
        />
      </div>
    </main>
    <div
        v-if="actionCheckBox"
        class="actionItemMenu color_colorBg background_blackLight"
    >
      <p class="textMontserrat_regular">
        <input type="checkbox" checked readonly> 3 объявления
      </p>
      <p class="textMontserrat_regular">
        Снять с публикации
      </p>
      <p class="textMontserrat_regular">
        Удалить
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.myAnnouncements {
  .profileNavigation {
    li {
      cursor: pointer;
    }
  }
  .content {
    flex: 1 1 70%;
    padding-top: rem(20);

    .header {
      gap: 0.5rem;
    }
  }


  .chooseAll {
    margin: rem(20) 0 0;
    display: flex;
    align-items: center;
    gap: rem(5);
  }

  //.profileGoods {
  //  max-width: rem(670);
  //}

  &__element {
    height: rem(115);
    display: flex;
    gap: rem(10);
    margin-top: rem(62);

    &:first-child {
      margin-top: 0;
    }

    .image {
      position: relative;
      display: flex;
      justify-content: center;
      //flex: 1 1 30%;
      //max-width: rem(177);

      img {
        height: rem(137);
        object-fit: cover;
      }

      .chooseThis {
        position: absolute;
        top: rem(5);
        left: rem(5);
      }
    }

    .header {
      //display: flex;
      //justify-content: space-between;
      display: grid;
      grid-template-columns: 1.4fr 0.8fr 0.5fr;
      width: 100%;
    }

    .content {
      width: 100%;
      padding-top: rem(10);
    }

    .info {
      flex: 1 1 50%;

      h2 {
        font-size: rem(18);
      }

      .text {
        padding-top: rem(21);

        p {
          font-size: rem(16);
        }
      }
    }

    .actionsContainer {
      flex: 1 1 25%;
      width: 100%;

      .dateBar {
        .bar {
          margin-top: rem(5);
          width: 75%;
          height: 5px;
          background: $color_green;
          border-radius: 5px;
        }
        .textMontserrat_regular{
          font-size: rem(13);
        }
      }
    }

    .buttons {
      position: relative;
      flex: 1 1 25%;
      display: flex;
      gap: rem(5);
      //align-items: center;

      .actionItem {
        width: rem(40);
        height: rem(35);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      }
    }

    .actionsMenu {
      z-index: 99999999;
      width: 100%;
      position: absolute;
      top: 45%;
      padding: rem(10);
      box-shadow: 0 10px 10px 5px rgb(221, 221, 221);

      p {
        cursor: pointer;
        text-transform: capitalize;
      }

      p:last-child {
        margin-top: rem(5);
      }
    }

    .likeInfo {
      margin-top: rem(10);
      display: flex;
      //justify-content: center;
      gap: rem(12);

      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;


        .image {
          width: rem(25);
        }
      }

      .textMontserrat_regular {
        font-size: rem(14);
      }

      .eye {
        path:last-child {
          fill: white;
        }

        path:first-child {
          fill: black;
        }
      }
    }
    .compact{
      .dateBar{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .likeInfo{
        justify-content: center;
      }
      .buttons{
        margin-top: rem(10);
      }
    }
  }

  @media (max-width: em(1920, 16)) {
    &__element {
      margin-top: calc(10rem / 16 + (62 - 10) * ((100vw - 390rem / 16) / (1920 - 390)));

      &:first-child {
        margin-top: 0;
      }

      .content {
        padding-top: calc(4rem / 16 + (10 - 4) * ((100vw - 390rem / 16) / (1920 - 390)));
      }

      .info {

        .text {
          padding-top: calc(9rem / 16 + (21 - 9) * ((100vw - 390rem / 16) / (1920 - 390)));
        }
      }

      .likeInfo {
        &__item {
          .image {
            width: calc(18rem / 16 + (25 - 18) * ((100vw - 390rem / 16) / (1920 - 390)));
            //svg{
            //  path:first-child{
            //    color
            //  }
            //}
          }
        }
      }
    }
  }

  //@media (max-width: em(1920, 16)) and (min-width: em(1024, 16)) {
  //  &__element {
  //    gap: calc(11rem / 16 + (40 - 11) * ((100vw - 1024rem / 16) / (1920 - 1024)));
  //  }
  //}

  @media (max-width: em(1024, 16)) {
    &__element {
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
      gap: rem(11);
      height: 100%;
    }
  }
  @media (max-width: em(768, 16)) {
    &__element {
      .image {
        flex: 1 1 40%;

        img {
          height: 100%;
          object-fit: cover;
        }
      }

      .content {
        flex: 1 1 60%;
      }

      .likeInfo {
        margin-top: calc(8rem / 16 + (12 - 8) * ((100vw - 390rem / 16) / (768 - 390)));
      }
    }

  }
}

.actionItemMenu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  margin-top: 12px;
  border-radius: 5px;

  p:first-child {
    display: flex;
    align-items: center;
    gap: rem(5);
  }

  p:nth-child(2), p:last-child {
    justify-self: end;
  }
}
</style>