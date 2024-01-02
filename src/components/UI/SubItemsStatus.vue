<script setup>
const props = defineProps({
  text: {
    type: String,
    default() {
      return  "";
    }
  },
  relevance: {
    type: String,
    default() {
      return  "";
    }
  }
});
</script>

<template>
  <div
      class="subItemStatus"
      :class="{'background_accent': props.relevance === 'urgent'}"
  >
    <p
        class="textMontserrat textMontserrat_regular color_colorBg"
    >
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.subItemStatus{
  height: rem(25);
  max-width: rem(150);
  display: flex;
  align-items: center;
  text-align: center;
}
</style>