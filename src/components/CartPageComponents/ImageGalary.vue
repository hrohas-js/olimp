<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {useProductStore} from "@/store/ProductStore";
import {ref, computed} from "vue";

const productStore = useProductStore();

const currentSlide = ref(0);

const props = defineProps({
  slider: {
    type: Array,
    default: () => ([])
  }
});

const isOneImage = computed(() => props.slider.length > 1);

const slideTo = (val) => {
  currentSlide.value = val;
}

const fetchGallery = (data) => {
  currentSlide.value = data.currentSlideIndex;
  console.log(currentSlide.value)
}
</script>

<template>
  <div class="imageGallery">
    <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="isOneImage"
        v-model="currentSlide"
        snap-align="center"
        @slide-end="fetchGallery"
    >
      <Slide
          v-for="(slide, index) in props.slider"
          :key="index"
      >
        <img
            :src="slide.src"
            alt="actor"
        />
      </Slide>
      <template #addons>
        <navigation v-if="isOneImage" />
      </template>
    </Carousel>

    <Carousel
        v-if="isOneImage"
        id="thumbnails"
        :items-to-show="8"
        :wrap-around="false"
        snap-align="start"
        v-model="currentSlide"
        ref="carousel"
    >
      <Slide
          v-for="(slide, index) in props.slider"
          :key="index"
          @click="slideTo(index)"
      >
        <img
            :src="slide.src"
            alt="photo"
            :class="{'active': currentSlide === index}"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.active {
  border: 2px solid $color_subBg;
}
</style>