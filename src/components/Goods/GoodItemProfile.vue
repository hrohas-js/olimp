<script setup>
import {computed} from "vue";
import {useProfileStore} from "@/store/ProfileStore";

const profileStore = useProfileStore();

const mainPhoto = computed(() => {
  let res = '';
  if (props.item.gallery) {
    res = JSON.parse(props.item.gallery)[0].src
  }
  return res;
});

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: () => {
      return "";
    }
  }
});

const removeLike = () => {
  profileStore.myLikes = [...profileStore.myLikes].filter(elem => props.item.id !== elem.id);
  profileStore.removeLike({
    user_id: profileStore.user.id,
    announcement_id: props.item.id
  }).then(() => {
    profileStore.getLikesCategories({
      user_id: profileStore.user.id
    });
  });
}
</script>

<template>
  <article class="goodItemProfile profileGoods">
    <div class="image">
      <router-link :to="{
        name: 'cartPage',
        params: {
          author: props.item.user_id,
          id: props.item.id
        }
      }">
        <img
            :src="mainPhoto"
            alt="altText"
        />
      </router-link>
    </div>
    <div class="content">
      <div class="header">
        <h2 class="textMontserrat_medium">
          <router-link :to="{
          name: 'cartPage',
          params: {
            author: props.item.user_id,
            id: props.item.id
          }
        }"
          >
            {{ props.item.title }}
          </router-link>
        </h2>
        <div
            v-if="props.mode !== 'sell'"
            class="wishButton"
            @click="removeLike"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="29" viewBox="0 0 32 29" fill="none">
            <path
                d="M31 9.79333C31 12.113 30.1093 14.3412 28.5187 15.9893C24.8573 19.7845 21.3061 23.742 17.5079 27.3996C16.6373 28.2258 15.2563 28.1956 14.4232 27.3321L3.48064 15.9893C0.173121 12.5608 0.173121 7.02584 3.48064 3.59735C6.82066 0.135175 12.2619 0.135175 15.6019 3.59735L15.9997 4.00963L16.3972 3.59759C17.9986 1.93675 20.1796 1 22.4579 1C24.7363 1 26.9172 1.93666 28.5187 3.59735C30.1094 5.24567 31 7.47365 31 9.79333Z"
                fill="#E9605A" stroke="black" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <router-link :to="{
          name: 'cartPage',
          params: {
            author: props.item.user_id,
            id: props.item.id
          }
        }" class="info">
        <p v-if="props.item.price > 0" class="price textMontserrat_light color_black">
          {{ props.item.price }} руб
        </p>
        <p class="infoLocation textMontserrat textMontserrat_light  color_blackLight">
          {{ props.item.location }}
        </p>
<!--        <time class="infoLocation textMontserrat textMontserrat_light color_blackLight" datetime="19:50">
          Сегодня 19:50
        </time>-->
      </router-link>
    </div>
  </article>
</template>

<style scoped lang="scss">
.goodItemProfile {
  margin-top: rem(20);
  display: flex;
  gap: rem(10);

  .image {
    height: rem(137);
    flex: 1 1 30%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    flex: 1 1 70%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: rem(18);
    }
  }

  .wishButton {
    cursor: pointer;
  }

  .info {
    width: 70%;
    display: flex;
    flex-direction: column;

    .price {
      margin: rem(10) 0;
      font-size: rem(14);
    }

    time {
      margin-top: rem(8);
    }

    .likeInfo__item {
      margin-top: rem(27);
      display: flex;
      align-items: center;
      gap: rem(38);

      &:first-child {
        margin-top: 0;
      }
    }
  }

  @media (max-width: em(1920, 16)) {
    .info {
      .price {
        margin: calc(8rem / 16 + (10 - 8) * ((100vw - 1024rem / 16) / (1920 - 1024))) 0;
      }
    }
  }

  @media (max-width: em(1024, 16)) {
    margin-top: calc(44rem / 16 + (56 - 44) * ((100vw - 390rem / 16) / (1024 - 390)));
    position: relative;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
    .info {
      .price {
        margin: calc(8rem / 16 + (21 - 8) * ((100vw - 390rem / 16) / (1024 - 390))) 0;
      }
    }
    .wishButton{
      position: absolute;
      bottom: rem(18);
      right: rem(18);
      width: calc(18rem / 16 + (32 - 18) * ((100vw - 390rem / 16) / (1024 - 390)));
    }
  }
}
</style>