<script setup>
const props = defineProps({
  newsText: {
    type: String,
    default() {
      return ""
    }
  }
});
</script>

<template>
  <article class="newsItem background_elements">
    <div class="image">
      <img src="@/assets/png/News/newsItem.png" :alt="props.newsText">
    </div>
      <h2 class="subItemTitle">
        {{ props.newsText }}
      </h2>
  </article>
</template>

<style scoped lang="scss">
.newsItem {
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  max-width: rem(250);

  .subItemTitle {
    text-align: center;
    padding: rem(50) 0;
  }

  @media (max-width: em(1024, 16)) {
    min-height: rem(121);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .image {
      margin-top: calc(4rem / 16 + (20 - 4) * ((100vw - 390rem / 16) / (1024 - 390)));
      display: flex;
      justify-content: center;

      img {
        width: calc(60rem / 16 + (90 - 60) * ((100vw - 390rem / 16) / (1024 - 390)));
        height: calc(60rem / 16 + (90 - 60) * ((100vw - 390rem / 16) / (1024 - 390)));
        border-radius: 50px;
        object-fit: cover;
      }
    }
    .subItemTitle {
      text-wrap: balance;
      padding: calc(2rem / 16 + (40 - 2) * ((100vw - 390rem / 16) / (1024 - 390))) 0 calc(4rem / 16 + (40 - 4) * ((100vw - 390rem / 16) / (1024 - 390)));
    }
  }
}
</style>