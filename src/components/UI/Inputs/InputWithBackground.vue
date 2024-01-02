<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default() {
      return ""
    }
  },
  inputMode:{
    type: String,
    default() {
      return "text"
    }
  }
});
</script>

<template>
  <input class="background_gray textMontserrat_light" type="text" :placeholder="props.placeholder" :inputmode="props.inputMode">
</template>

<style scoped lang="scss">
input {
  font-size: 1rem;
  padding: rem(8) rem(23);
  ::placeholder{
    font-size: rem(14);
  }
}
</style>