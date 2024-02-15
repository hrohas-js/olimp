<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {useProductStore} from "@/store/ProductStore";
import {ref, computed} from "vue";
import YouTube from "vue3-youtube";

const productStore = useProductStore();

const currentSlide = ref(0);
const visibleRef = ref(false)

const props = defineProps({
  slider: {
    type: Array,
    default: () => ([])
  },
  video: {
    type: String,
    default: ''
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

const onShow = () => (visibleRef.value = true);

const onHide = () => (visibleRef.value = false);
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
            @click="onShow"
        />
      </Slide>
      <Slide v-show="props.video.length > 0" :key="props.slider.length">
        <YouTube :src="props.video" width="100%" height="100%" />
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
            @click="onShow"
        />
      </Slide>
      <Slide v-show="props.video.length > 0" :key="props.slider.length">
        <YouTube :src="props.video" width="100%" height="100%" />
      </Slide>
    </Carousel>
    <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="props.slider"
        :index="currentSlide"
        @hide="onHide"
    />
  </div>
</template>

<style scoped lang="scss">
.active {
  border: 2px solid $color_subBg;
}

img {
  cursor: pointer;
}
</style>