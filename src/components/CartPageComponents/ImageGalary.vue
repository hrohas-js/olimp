<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {useProductStore} from "@/store/ProductStore";
import {ref} from "vue";

const productStore = useProductStore();

const currentSlide = ref(0);

const props = defineProps({
  slider: {
    type: Array,
    default: () => ([])
  }
});

const slideTo = (val) => {
  currentSlide.value = val
}
const fetchGallery = (data) => {
  currentSlide.value = data.currentSlideIndex
}
</script>

<template>
  <div class="imageGallery">
    <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="props.slider.length > 1"
        v-model="currentSlide"
        class="main"
        @slide-end="fetchGallery"
    >
      <Slide
          v-for="slide in props.slider"
          :key="slide.id"
      >
        <img
            :src="slide.src"
            alt="actor"
        />
      </Slide>
      <template #addons>
        <navigation/>
      </template>
    </Carousel>

    <Carousel
        v-if="props.slider.length > 1"
        id="thumbnails"
        :items-to-show="8"
        :wrap-around="false"
        snap-align="start"
        v-model="currentSlide"
        ref="carousel"
    >
      <Slide
          v-for="slide in props.slider"
          :key="slide.id"
          @click="slideTo(slide.id - 1)"
      >
        <img
            :src="slide.src"
            alt="actor"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">

</style>