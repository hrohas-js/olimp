<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <section class="notificationItem textMontserrat tabs">
    <header class="notificationItem__header">
      <h3 class="textMontserrat_medium">
        {{ props.item.text }}
      </h3>
      <time class="textMontserrat_light" datetime="Вчера 21:00">
        {{ props.item.dt_created }}
      </time>
    </header>
  </section>
</template>

<style scoped lang="scss">
.notificationItem{
  cursor: pointer;
  margin-top: rem(10);
  &:first-child{
    margin-top: 0;
  }
  .textMontserrat_medium{
    font-size: rem(16);
  }
  &__header{
    display: flex;
    justify-content: space-between;
    gap: rem(20);
    margin-bottom: rem(10);
    .textMontserrat_light{
      font-size:rem(14);
    }
  }

  &__footer{
    .textMontserrat_light{
      font-size: rem(14);
    }
  }
  .fraction{
    padding-bottom: rem(10);
    border-bottom: 1px solid $color_subBgLight;
  }
}

</style>