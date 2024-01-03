<script setup>
import {computed, onMounted} from "vue";
import {useMainStore} from "@/store/MainStore";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapDefaultFeaturesLayer
} from 'vue-yandex-maps';
import {useProductStore} from "@/store/ProductStore";

const mainStore = useMainStore();
const productStore = useProductStore();

const marker = computed(() => productStore.marker);

const styleObject = {
  position: "relative",
  width: "20px",
  height: "20px",
  backgroundColor: "#ff0000",
  borderRadius: "50%",
  border: "2px solid #ffffff",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
  color: "#ffffff",
  fontWeight: "bold",
  lineHeight: "20px",
};

onMounted(async() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  })
});

const closeModal = () => {
  mainStore.popup = '';
};
</script>

<template>
  <div class="modal">
    <div class="modal__content background_mainBg">
      <div class="map">
        <yandex-map
            :settings="{
              location: {
                center: marker.coordinates.length > 0 ? marker.coordinates : [37.617644, 55.755819],
                zoom: 9,
              },
            }"
            width="100%"
            height="300px"
        >
          <yandex-map-default-scheme-layer/>
          <yandex-map-default-features-layer/>
          <yandex-map-marker :settings="marker">
            <template #default>
              <div :style="styleObject"/>
            </template>
          </yandex-map-marker>
        </yandex-map>
      </div>
      <button class="close" @click="closeModal">
        <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="#E9605A"/>
          <path d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  &__content {
    padding: 3%;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: rem(25);
    position: relative;
    border-radius: rem(5);

    .map {
      width: 100%;
      background-color: $color_gray;
    }
    .close {
      position: absolute;
      top: rem(6);
      right: rem(6);
    }
  }
}
.button {
  &_mainButton {
    width: 30%;
    align-self: flex-end;
  }
}
</style>