<script setup>

const props = defineProps({
  date: {
    type: String,
    default: ""
  }
});

</script>

<template>
  <div class="dataMassage background_colorRedBlur">
    <h3 class="color_bg text_medium">
      date
    </h3>
  </div>
</template>

<style scoped lang="scss">
.dataMassage{
  height: rem(33);
  width: fit-content;
  padding: rem(5) rem(28);
  display: flex;
  align-items: center;
  border-radius: 29px;
  text-align: center;
  align-self: center;
}
</style>