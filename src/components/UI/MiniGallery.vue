<script setup>
import {computed} from "vue";
import {useAnnouncementStore} from "@/store/AnnouncementStore";

const announcementStore = useAnnouncementStore();
const gallery = computed(() => announcementStore.newItem.gallery);

const removeFromGallery = (data) => {
  announcementStore.removeFromGallery({
    url: data.src
  });
}
</script>

<template>
  <div class="gallery">
    <div
        v-for="image in gallery"
        :key="image.id"
        class="image-container"
    >
      <img
          :src="image.src"
          class="image"
      />
      <span
          class="delete-icon"
          @click="removeFromGallery(image)"
      >
        ✖
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: rem(10);
  margin-top: rem(10);

  .image-container {
    position: relative;
    display: inline-block;

    .image {
      width: rem(70);
      height: rem(70);
      object-fit: cover;
    }

    .delete-icon {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: none;
    }

    &:hover .delete-icon {
      display: block;
    }
  }
}
</style>