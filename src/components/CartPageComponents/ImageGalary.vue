<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {useProductStore} from "@/store/ProductStore";
import {ref, computed} from "vue";
import YouTubeVideo from "@/components/UI/YouTubeVideo";

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
      <Slide v-if="props.video.length > 0" :key="props.slider.length">
        <YouTubeVideo :video-link="props.video" />
      </Slide>
      <template #addons>
        <navigation v-if="isOneImage" />
      </template>
    </Carousel>

    <Carousel
        v-if="isOneImage"
        id="thumbnails"
        :items-to-show="6"
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
      <Slide
          v-show="props.video.length > 0"
          :key="props.slider.length"
          @click="slideTo(props.slider.length)"
      >
        <img
            :src="props.slider[0].src"
            alt="photo"
            class="video"
            :class="{'active': currentSlide === props.slider.length}"
        />
        <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 461.001 461.001" xml:space="preserve">
          <g>
            <path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
              c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
              C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
              c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
          </g>
        </svg>
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

svg {
  position: absolute;
}
</style>