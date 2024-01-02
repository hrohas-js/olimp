<script setup>
const props = defineProps({
  placeholderFrom: {
    type: String,
    default: () => {
      return ""
    }
  },
  placeholderTo: {
    type: String,
    default: () => {
      return ""
    }
  }
});
</script>

<template>
  <div class="cost textMontserrat">
    <input
        type="text"
        class="cost__item border_gray textMontserrat_light"
        :placeholder="props.placeholderFrom"
    >
    <input
        type="text"
        class="cost__item border_gray textMontserrat_light"
        :placeholder="props.placeholderTo"
    >
  </div>
</template>

<style scoped lang="scss">
.cost{
  display: flex;
  gap: rem(20);
  &__item{
    height: rem(45);
    max-width: rem(120);
    text-align: center;
  }
}
</style>