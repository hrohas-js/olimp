<script setup>
import {computed} from "vue";

const props = defineProps({
  text: {
    type: String,
    default() {
      return ""
    }
  },
  doubleElem: {
    type: Boolean,
    default() {
      return false;
    }
  }
});

const doubleElemImage = computed(() => {
  switch (props.text) {
    case "Добавить в избранное":
      return  `
             <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <path d="M18 5.79834C18 7.06416 17.4953 8.27999 16.5939 9.17938C14.5192 11.2503 12.5068 13.4098 10.3545 15.4057C9.86116 15.8565 9.07857 15.8401 8.60648 15.3689L2.40569 9.17938C0.531435 7.30849 0.531435 4.28818 2.40569 2.41732C4.29837 0.528083 7.38175 0.528083 9.27441 2.41732L9.49983 2.64229L9.72508 2.41745C10.6325 1.51117 11.8684 1 13.1595 1C14.4506 1 15.6864 1.51112 16.5939 2.41732C17.4954 3.31678 18 4.53254 18 5.79834Z" stroke="black" stroke-opacity="0.8" stroke-linejoin="round"/>
             </svg>
          `;
    case "В избранном":
      return  `
             <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <path fill="red" d="M18 5.79834C18 7.06416 17.4953 8.27999 16.5939 9.17938C14.5192 11.2503 12.5068 13.4098 10.3545 15.4057C9.86116 15.8565 9.07857 15.8401 8.60648 15.3689L2.40569 9.17938C0.531435 7.30849 0.531435 4.28818 2.40569 2.41732C4.29837 0.528083 7.38175 0.528083 9.27441 2.41732L9.49983 2.64229L9.72508 2.41745C10.6325 1.51117 11.8684 1 13.1595 1C14.4506 1 15.6864 1.51112 16.5939 2.41732C17.4954 3.31678 18 4.53254 18 5.79834Z" stroke="black" stroke-opacity="0.8" stroke-linejoin="round"/>
             </svg>
          `;
  }
});
</script>

<template>
  <button
      class="button button_actionButton"
      :class="{'doubleElem': props.doubleElem}"
  >
    {{ props.text }}
    <div class="image" v-html="doubleElemImage"/>
  </button>
</template>

<style scoped lang="scss">
.doubleElem{
  gap: 0.5rem;
  .image{
    cursor: pointer;
    display: flex;
  }
}

</style>