<script setup>

</script>

<template>
  <div class="selectOptions">
    <p class="textMontserrat textMontserrat_light">
      Город
    </p>
    <div class="image">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selectOptions{
  cursor: pointer;
  display: flex;
  align-items: center;

  p {
    font-size: rem(12);
  }

  .image{
    display: flex;
    svg{
      fill: $color_accent;
      transform: scale(0.6);
    }
  }
}
</style>