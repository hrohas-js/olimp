<script setup>
const props = defineProps({
  title: {
    type: String,
    default(){
      return "Лучшие камеры 2022"
    }
  },
  item: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <article class="goodsItemReviews">
    <div class="image" v-html="props.item.player" />
    <section class="goodsItemReviews__content">
      <header class="goodsItemReviews__header textMontserrat">
        <h3 class="textMontserrat_medium">
          {{ props.item.title }}
        </h3>
      </header>
    </section>
  </article>
</template>

<style scoped lang="scss">
.goodsItemReviews{
  cursor: pointer;
  &__header{
    margin: rem(21) 0;
  }
  &__footer{
    max-width: rem(87);
  }

  @media (max-width: em(1920, 16)){
    &__header{
      margin: calc(9rem / 16 + (21 - 9) * ((100vw - 390rem / 16) / (1920 - 390))) 0;
    }
    &__footer{
      width: calc(50rem / 16 + (87 - 50) * ((100vw - 390rem / 16) / (1920 - 390)));
    }
  }
}
</style>