<script setup>
import {computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProductStore} from "@/store/ProductStore";
import {useRouter} from "vue-router";
import {useProfileStore} from "@/store/ProfileStore";

const router = useRouter();
const mainStore = useMainStore();
const productStore = useProductStore();
const profileStore = useProfileStore();

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  },
  itemTitle: {
    type: String,
    default() {
      return ""
    }
  },
  itemPrice: {
    type: String,
    default() {
      return ""
    }
  },
  advertising:{
    type: Boolean,
    default() {
      return false
    }
  }
});

const width = computed(() => mainStore.display_width);

const mainPhoto = computed(() => {
  const gal = JSON.parse(props.item.gallery);
  if (gal[0].src) {
    return gal[0].src;
  } else {
    return '';
  }
});
const categoriesTree = computed(() => {
  const cats = JSON.parse(props.item.categories);
  return cats[cats.length - 1].name;
});
const vacancyFlag = computed(() => {
  const cats = JSON.parse(props.item.categories);
  return cats[0].id === 1;
});
const isLiked = computed(() => {
  let flag = false;
  profileStore.myLikes.forEach(elem => {
    if (props.item.id === elem.id) {
      flag = true;
    }
  });
  return flag;
});

const goToProduct = () => {
  const url = router.resolve({
    name: "cartPage",
    params: {
      author: props.item.user_id,
      id: props.item.id
    }
  }).href;
  window.open(url, '_blank');
}

const setLike = () => {
  if (isLiked.value) {
    profileStore.myLikes = profileStore.myLikes.filter(elem => props.item.id !== elem.id);
    profileStore.addLike({
      user_id: profileStore.user.id,
      announcement_id: props.item.id
    });
  } else {
    profileStore.myLikes.push(props.item);
    profileStore.removeLike({
      user_id: profileStore.user.id,
      announcement_id: props.item.id
    });
  }
  localStorage.setItem('myLikes', JSON.stringify(profileStore.myLikes));
}
</script>

<template>
  <article class="goodItem background_elements">
    <div class="image" @click="goToProduct">
      <img
          v-if="mainPhoto.length > 0"
          :src="mainPhoto"
          :alt="props.item.title"
      />
      <span v-else>
        {{ categoriesTree }}
      </span>
    </div>
    <section class="goodItem__content">
      <header class="goodItem__header">
        <h2 class="textMontserrat textMontserrat_medium color_colorSubBg" @click="goToProduct">
           <span v-if="vacancyFlag">
             Требуется
           </span>
          {{ props.item.title }}
        </h2>
        <div
            class="wishButton"
            @click="setLike"
        >
          <svg
              :class="{'active':isLiked}"
              xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
            <path d="M18 5.79834C18 7.06416 17.4953 8.27999 16.5939 9.17938C14.5192 11.2503 12.5068 13.4098 10.3545 15.4057C9.86116 15.8565 9.07857 15.8401 8.60648 15.3689L2.40569 9.17938C0.531435 7.30849 0.531435 4.28818 2.40569 2.41732C4.29837 0.528083 7.38175 0.528083 9.27441 2.41732L9.49983 2.64229L9.72508 2.41745C10.6325 1.51117 11.8684 1 13.1595 1C14.4506 1 15.6864 1.51112 16.5939 2.41732C17.4954 3.31678 18 4.53254 18 5.79834Z" stroke="black" stroke-opacity="0.8" stroke-linejoin="round"/>
          </svg>
        </div>
      </header>
      <main class="goodItem__main">
        <p class="textMontserrat textMontserrat_regular">
          {{ vacancyFlag ? 'Оплата' : 'Цена' }}: {{ props.item.price }} руб.
        </p>
      </main>
      <footer class="goodItem__footer">
        <p class="textMontserrat textMontserrat_regular  color_blackLight">
          {{ categoriesTree }}
        </p>
        <p class="textMontserrat textMontserrat_regular  color_blackLight">
          {{ props.item.location }}
        </p>
<!--        <time class="textMontserrat textMontserrat_light color_blackLight" datetime="19:50">
          Сегодня 19:50
        </time>-->
      </footer>
    </section>
  </article>
</template>

<style scoped lang="scss">
.goodItem{
  cursor: pointer;
  width: 100%;
  padding: 0 0 rem(10) 0;
  transition: all 0.2s;

  .image {
    height: rem(177);
    border: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  .wishButton{
    cursor: pointer;
  }
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .textMontserrat_medium{
      font-size: 1rem;
    }
  }

  &__main{
    margin: rem(5) 0;

    .textMontserrat {
      text-align: left;
      font-size: rem(14);
    }
  }

  &__content{
    //height: rem(120);
    padding: rem(10) rem(20) rem(10) rem(1);
    transition: all 0.3s;

  }

  &__footer{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: rem(5);
    .textMontserrat_regular{
      font-size: rem(14);
    }
  }

  .active{
      path{
      fill:$color_accent;
    }
  }
  @media (max-width: em(1024,16)) {
    &:hover{
      .goodItem__content{
        //padding: rem(10) rem(20) rem(10) rem(1);
        //border: none;
        box-shadow: none;
      }
    }
    .image{
      img{
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
.boxShadow{
  padding-top: rem(10);
  border-radius: 10px;
  box-shadow: 4px 4px 4px 0 rgba(41, 99, 164, 0.39);
}
</style>