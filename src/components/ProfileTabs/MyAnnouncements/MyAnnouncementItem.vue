<script setup>
import ActionButton from "@/components/UI/Button/ActionButton";
import {useMainStore} from "@/store/MainStore";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {useProfileStore} from "@/store/ProfileStore";
import {computed, ref, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const mainStore = useMainStore();
const announcementStore = useAnnouncementStore();
const profileStore = useProfileStore();

const actionItem = ref(false);
const mainButton = ref({});
const secondaryButtons = ref([]);

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  mode: {
    type: String,
    default: ""
  }
});

const width = computed(() => mainStore.display_width);
const daysLeft = computed(() => {
  const startDate = new Date('2023-12-31T19:49:30');
  const endDate = new Date('2024-01-20T00:00:00');
  const differenceInTime = endDate.getTime() - startDate.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
});
const daysLeftWords = computed(() => {
  const lastDigit = daysLeft.value % 10;
  const lastTwoDigits = daysLeft.value % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'дней';
  }
  switch (lastDigit) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
});
const daysLeftPercent = computed(() => (daysLeft.value / 20) * 100);
const mainImage = computed(() => {
  const gal = JSON.parse(props.item.gallery);
  return gal[0].src;
});

onMounted(() => {
  switch (props.mode) {
    case "publish":
      mainButton.value = {
        id: 1,
        name: 'Редактировать'
      };
      secondaryButtons.value = [
        {
          id: 2,
          name: 'Удалить'
        },
        {
          id: 3,
          name: 'Снять с публикации'
        }
      ];
      break;
    case "archive":
    case "draft":
      mainButton.value = {
        id: 4,
        name: 'Активировать'
      };
      secondaryButtons.value = [
        {
          id: 2,
          name: 'Удалить'
        },
        {
          id: 1,
          name: 'Редактировать'
        }
      ];
  }
});

const openActionMenu = () => {
  actionItem.value = !actionItem.value;
}

const announcementAction = (id) => {
  switch (id) {
    case 1:
      announcementStore.newItem.title = props.item.title;
      announcementStore.newItem.description = props.item.description;
      announcementStore.newItem.categories = JSON.parse(props.item.categories);
      announcementStore.newItem.price = props.item.price;
      announcementStore.newItem.selectedParameters = JSON.parse(props.item.parameters);
      announcementStore.newItem.gallery = JSON.parse(props.item.gallery);
      announcementStore.newItem.location = props.item.location;
      announcementStore.newItem.phone = props.item.phone;
      announcementStore.newItem.status = props.item.status;
      announcementStore.newItem.communication = props.item.communication;
      announcementStore.newItem.video = props.item.video;
      announcementStore.editID = props.item.id;
      router.push('/postAdvertisements/edit')
      break;
    case 2:
      //some
      break;
    case 3:
      announcementStore.changeAnnouncementStatus({
        id: props.item.id,
        status: 'archive',
        user_id: profileStore.user.id
      });
      break;
    case 4:
      announcementStore.changeAnnouncementStatus({
        id: props.item.id,
        status: 'publish',
        user_id: profileStore.user.id
      });
      break;
  }
}
</script>

<template>
  <article class="myAnnouncements__element profileGoods">
    <div class="image">
      <img
          :src="mainImage"
          :alt="item.title"
      />
<!--      <input
          type="checkbox"
          class="chooseThis"
      />-->
    </div>
    <div class="content">
      <div
          v-if="width > 768"
          class="header"
      >
        <div class="info">
          <h2 class="textMontserrat_medium">
            {{ item.title }}
          </h2>
          <div class="text">
            <p class="price textMontserrat_light">
              {{ item.price }} руб
            </p>
          </div>
        </div>
        <div
            v-if="width > 1230"
            class="actionsContainer">
          <div class="dateBar">
            <p class="textMontserrat_regular">
              Осталось {{ daysLeft }} {{ daysLeftWords }}
            </p>
            <div class="bar">
              <div
                  class="bar-load"
                  :style="{width: daysLeftPercent + '%'}"
              />
            </div>
          </div>
          <div class="likeInfo">
            <div class="likeInfo__item">
              <div class="image eye">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="25" viewBox="0 0 27 19" fill="none">
                  <path
                      d="M26 9.33333C23.3769 13.4875 18.6643 17.6667 13.5 17.6667C8.33569 17.6667 3.623 13.4875 1 9.33333C4.19243 5.38646 7.93282 1 13.5 1C19.0672 1 22.8076 5.38639 26 9.33333Z"
                      stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M13.5004 12.1111C15.0346 12.1111 16.2782 10.8675 16.2782 9.33332C16.2782 7.79915 15.0346 6.55554 13.5004 6.55554C11.9663 6.55554 10.7227 7.79915 10.7227 9.33332C10.7227 10.8675 11.9663 12.1111 13.5004 12.1111Z"
                      stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p class="textMontserrat_regular">
                {{ item.views }}
              </p>
            </div>
            <div class="likeInfo__item">
              <div class="image">
                <svg height="25" width="1rem" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 60.671 60.671" xml:space="preserve"
                     fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style="fill:#010002;" cx="30.336" cy="12.097"
                                                                rx="11.997" ry="12.097"></ellipse>
                    <path style="fill:#010002;"
                          d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>
                <!--                    <svg width="1rem" height="25" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"-->
                <!--                    >-->
                <!--                      <g data-name="Layer 2" id="Layer_2">-->
                <!--                        <path-->
                <!--                            d="M16,17.5A7.5,7.5,0,1,1,23.5,10,7.5,7.5,0,0,1,16,17.5Zm0-14A6.5,6.5,0,1,0,22.5,10,6.51,6.51,0,0,0,16,3.5Z"/>-->
                <!--                        <path-->
                <!--                            d="M26,28.5H6a.5.5,0,0,1-.5-.5V22a.68.68,0,0,1,0-.14c.48-1.66,2-2.81,3.4-3.82.33-.25.64-.48.93-.72a.51.51,0,0,1,.68.05A7.17,7.17,0,0,0,16,19.5a7.11,7.11,0,0,0,5.45-2.13.51.51,0,0,1,.68-.05c.29.24.6.47.93.71,1.37,1,2.92,2.17,3.4,3.83a.68.68,0,0,1,0,.14v6A.5.5,0,0,1,26,28.5Zm-19.5-1h19V22.07c-.41-1.3-1.79-2.33-3-3.23l-.61-.46A8.24,8.24,0,0,1,16,20.5a8.29,8.29,0,0,1-5.89-2.12l-.62.46c-1.22.9-2.6,1.93-3,3.23Z"/>-->
                <!--                      </g>-->
                <!--                    </svg>-->

              </div>
              <p class="textMontserrat_regular">
                5
              </p>
            </div>
            <div class="likeInfo__item">
              <div class="image">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="25" viewBox="0 0 27 25" fill="none">
                  <path
                      d="M26 8.72872C26 10.7048 25.2577 12.6028 23.9323 14.0068C20.8811 17.2397 17.9217 20.6109 14.7566 23.7266C14.0311 24.4304 12.8802 24.4047 12.186 23.6691L3.0672 14.0068C0.310934 11.0862 0.310934 6.37123 3.0672 3.45066C5.85055 0.501395 10.3849 0.501395 13.1682 3.45066L13.4997 3.80186L13.831 3.45087C15.1655 2.03607 16.983 1.2381 18.8816 1.2381C20.7802 1.2381 22.5976 2.03599 23.9323 3.45066C25.2579 4.85479 26 6.7527 26 8.72872Z"
                      fill="#E9605A" stroke="black" stroke-linejoin="round"/>
                </svg>
              </div>
              <p class="textMontserrat_regular">
                {{ item.likes_count }}
              </p>
            </div>
          </div>
        </div>
        <div
            v-if="width > 1230"
            class="buttons"
        >
          <action-button
              :text="mainButton.name"
              @click="announcementAction(mainButton.id)"
          />
          <div
              class="actionItem border_subBg"
              @click.stop="openActionMenu"
          >
            ...
          </div>
          <div
              v-if="actionItem"
              class="actionsMenu textMontserrat_regular background_elements"
          >
            <p
                v-for="button in secondaryButtons"
                :key="button.id"
                @click="announcementAction(button.id)"
            >
              {{ button.name }}
            </p>
          </div>
        </div>
        <div
            v-if="width <= 1230"
            class="compact"
        >
          <div
              class="actionsContainer">
            <div class="dateBar">
              <p class="textMontserrat_regular">
                Осталось {{ daysLeft }} {{ daysLeftWords }}
              </p>
              <div class="bar">
                <div
                    class="bar-load"
                    :style="{width: daysLeftPercent + '%'}"
                />
              </div>
            </div>
            <div class="likeInfo">
              <div class="likeInfo__item">
                <div class="image eye">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="25" viewBox="0 0 27 19" fill="none">
                    <path
                        d="M26 9.33333C23.3769 13.4875 18.6643 17.6667 13.5 17.6667C8.33569 17.6667 3.623 13.4875 1 9.33333C4.19243 5.38646 7.93282 1 13.5 1C19.0672 1 22.8076 5.38639 26 9.33333Z"
                        stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M13.5004 12.1111C15.0346 12.1111 16.2782 10.8675 16.2782 9.33332C16.2782 7.79915 15.0346 6.55554 13.5004 6.55554C11.9663 6.55554 10.7227 7.79915 10.7227 9.33332C10.7227 10.8675 11.9663 12.1111 13.5004 12.1111Z"
                        stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p class="textMontserrat_regular">
                  {{ item.views }}
                </p>
              </div>
              <div class="likeInfo__item">
                <div class="image">
                  <svg height="25" width="1rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 60.671 60.671" xml:space="preserve"
                       fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style="fill:#010002;" cx="30.336" cy="12.097"
                                                                  rx="11.997" ry="12.097"></ellipse>
                      <path style="fill:#010002;"
                            d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>
                  <!--                    <svg width="1rem" height="25" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"-->
                  <!--                    >-->
                  <!--                      <g data-name="Layer 2" id="Layer_2">-->
                  <!--                        <path-->
                  <!--                            d="M16,17.5A7.5,7.5,0,1,1,23.5,10,7.5,7.5,0,0,1,16,17.5Zm0-14A6.5,6.5,0,1,0,22.5,10,6.51,6.51,0,0,0,16,3.5Z"/>-->
                  <!--                        <path-->
                  <!--                            d="M26,28.5H6a.5.5,0,0,1-.5-.5V22a.68.68,0,0,1,0-.14c.48-1.66,2-2.81,3.4-3.82.33-.25.64-.48.93-.72a.51.51,0,0,1,.68.05A7.17,7.17,0,0,0,16,19.5a7.11,7.11,0,0,0,5.45-2.13.51.51,0,0,1,.68-.05c.29.24.6.47.93.71,1.37,1,2.92,2.17,3.4,3.83a.68.68,0,0,1,0,.14v6A.5.5,0,0,1,26,28.5Zm-19.5-1h19V22.07c-.41-1.3-1.79-2.33-3-3.23l-.61-.46A8.24,8.24,0,0,1,16,20.5a8.29,8.29,0,0,1-5.89-2.12l-.62.46c-1.22.9-2.6,1.93-3,3.23Z"/>-->
                  <!--                      </g>-->
                  <!--                    </svg>-->

                </div>
                <p class="textMontserrat_regular">
                  5
                </p>
              </div>
              <div class="likeInfo__item">
                <div class="image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="25" viewBox="0 0 27 25" fill="none">
                    <path
                        d="M26 8.72872C26 10.7048 25.2577 12.6028 23.9323 14.0068C20.8811 17.2397 17.9217 20.6109 14.7566 23.7266C14.0311 24.4304 12.8802 24.4047 12.186 23.6691L3.0672 14.0068C0.310934 11.0862 0.310934 6.37123 3.0672 3.45066C5.85055 0.501395 10.3849 0.501395 13.1682 3.45066L13.4997 3.80186L13.831 3.45087C15.1655 2.03607 16.983 1.2381 18.8816 1.2381C20.7802 1.2381 22.5976 2.03599 23.9323 3.45066C25.2579 4.85479 26 6.7527 26 8.72872Z"
                        fill="#E9605A" stroke="black" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p class="textMontserrat_regular">
                  {{ item.likes }}
                </p>
              </div>
            </div>
          </div>
          <div class="buttons">
            <action-button
                :text="mainButton.name"
                @click="announcementAction(mainButton.id)"
            />
            <div
                class="actionItem border_subBg"
                @click.stop="openActionMenu"
            >
              ...
            </div>
            <div
                v-if="actionItem"
                class="actionsMenu textMontserrat_regular background_elements"
            >
              <p
                  v-for="button in secondaryButtons"
                  :key="button.id"
                  @click="announcementAction(button.id)"
              >
                {{ button.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
          v-if="width <= 768"
          class="header"
      >
        <!--              <div class="activeMenu border_subBg">-->
        <!--                ...-->
        <!--              </div>-->
        <h2 class="textMontserrat_medium">
          Аренда проф. фотоаппарата
        </h2>

      </div>
      <div
          v-if="width <= 768"
          class="info"
      >
        <div class="text">
          <p class="price textMontserrat_light">
            1000 руб/час
          </p>
        </div>
        <div class="likeInfo">
          <div class="likeInfo__item">
            <div class="image">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 19" fill="none">
                <path
                    d="M13.5004 12.1111C15.0346 12.1111 16.2782 10.8675 16.2782 9.33332C16.2782 7.79915 15.0346 6.55554 13.5004 6.55554C11.9663 6.55554 10.7227 7.79915 10.7227 9.33332C10.7227 10.8675 11.9663 12.1111 13.5004 12.1111Z"
                    stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M26 9.33333C23.3769 13.4875 18.6643 17.6667 13.5 17.6667C8.33569 17.6667 3.623 13.4875 1 9.33333C4.19243 5.38646 7.93282 1 13.5 1C19.0672 1 22.8076 5.38639 26 9.33333Z"
                    stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="textMontserrat_light">
              260
            </p>
          </div>
          <div class="likeInfo__item">
            <div class="image">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 30" fill="none">
                <path
                    d="M1 29.2381V27.4524C1 20.5488 6.59645 14.9524 13.5 14.9524C20.4036 14.9524 26 20.5488 26 27.4524V29.2381"
                    stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M13.5003 14.9524C17.4451 14.9524 20.6431 11.7544 20.6431 7.80954C20.6431 3.86465 17.4451 0.666687 13.5003 0.666687C9.55539 0.666687 6.35742 3.86465 6.35742 7.80954C6.35742 11.7544 9.55539 14.9524 13.5003 14.9524Z"
                    stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="textMontserrat_light">
              5
            </p>
          </div>
          <div class="likeInfo__item">
            <div class="image">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27 25" fill="none">
                <path
                    d="M26 8.72872C26 10.7048 25.2577 12.6028 23.9323 14.0068C20.8811 17.2397 17.9217 20.6109 14.7566 23.7266C14.0311 24.4304 12.8802 24.4047 12.186 23.6691L3.0672 14.0068C0.310934 11.0862 0.310934 6.37123 3.0672 3.45066C5.85055 0.501395 10.3849 0.501395 13.1682 3.45066L13.4997 3.80186L13.831 3.45087C15.1655 2.03607 16.983 1.2381 18.8816 1.2381C20.7802 1.2381 22.5976 2.03599 23.9323 3.45066C25.2579 4.85479 26 6.7527 26 8.72872Z"
                    fill="#E9605A" stroke="black" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="textMontserrat_light">
              10
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.myAnnouncements__element {
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
        background: $color_accent;
        border-radius: 5px;

        &-load {
          background: $color_green;
          height: 5px;
          border-radius: 5px;
        }
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
      cursor: pointer;
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
  .myAnnouncements__element {
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
  .myAnnouncements__element {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
    gap: rem(11);
    height: 100%;
  }
}
@media (max-width: em(768, 16)) {
  .myAnnouncements__element {
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
</style>