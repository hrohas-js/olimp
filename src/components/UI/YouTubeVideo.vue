<template>
  <div>
    <iframe
        width="100%"
        height="100%"
        :src="videoUrl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Пропс для получения URL видео
const props = defineProps({
  videoLink: String
});

// Реактивная ссылка на URL видео для iframe
const videoUrl = ref('');

// Функция для преобразования обычной ссылки YouTube в ссылку для встраивания
const transformYoutubeLink = (link) => {
  if (!link) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = link.match(regExp);
  if (match && match[2].length == 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return '';
  }
};

// Наблюдаем за изменениями пропса videoLink и обновляем videoUrl
watch(() => props.videoLink, (newValue) => {
  videoUrl.value = transformYoutubeLink(newValue);
}, { immediate: true });
</script>
