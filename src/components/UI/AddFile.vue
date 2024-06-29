<script setup>
import {ElMessage} from "element-plus";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {computed} from "vue";

const announcementStore = useAnnouncementStore();

const gallery = computed(() => announcementStore.newItem.gallery);

const addFile = () => {
  const input = document.querySelector('.addFileInput');
  input.click();
}

const checkFileCount = (e) => {
  const maxFiles = 10;
  const files = e.target.files;

  if (files.length > maxFiles || files.length + gallery.value.length > maxFiles) {
    ElMessage({
      type: 'error',
      message: `Вы можете загрузить не более ${maxFiles} файлов.`,
      duration: 6000
    });
    e.target.value = '';
  } else {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size <= 15000000 && (files[i].name.indexOf('.jpg') !== -1 || files[i].name.indexOf('.png') !== -1)) {
        formData.append('photos' + i, files[i]);
      } else {
        if (files[i].size > 15000000) {
          ElMessage({
            type: 'error',
            message: 'Одно из фото превышает допустимый размер в 1.5 Мб!',
            duration: 6000
          });
        }
        if (files[i].name.indexOf('.jpg') === -1 && files[i].name.indexOf('.png') === -1) {
          ElMessage({
            type: 'error',
            message: 'Использован недопустимый формат изображения!',
            duration: 6000
          });
        }
      }
    }
    announcementStore.uploadGallery(formData);
  }
}
</script>

<template>
  <div class="addFile textMontserrat">
    <div class="text textMontserrat_medium">
      <p>
        Фотографии
      </p>
      <p class="color_blackLight">
        не более {{ 10 - gallery.length }}<br>
        (допусутимые форматы: jpg, png)
      </p>
    </div>
    <div
        class="inputField border_subBg"
        @click="addFile"
    >
      <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          class="addFileInput"
          @change="checkFileCount"
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="121" height="104" viewBox="0 0 121 104" fill="none">
        <g clip-path="url(#clip0_361_3)">
          <path d="M36.3133 0.194756C35.2761 0.462669 34.5106 0.949791 33.6464 1.83878C32.5969 2.94698 31.9672 4.03083 29.0039 9.88844L26.4851 14.8571H20.3117C16.9163 14.8571 13.7184 14.9179 13.2122 14.9788C6.50778 15.8435 1.18625 20.9582 0.186146 27.51C-0.0854863 29.2636 -0.0854863 89.5934 0.186146 91.347C0.65533 94.4645 2.11227 97.302 4.38411 99.5549C6.12502 101.284 8.16227 102.514 10.4588 103.257C12.7553 103.988 9.07594 103.939 60.5627 103.939C105.888 103.939 107.889 103.927 108.876 103.72C114.432 102.514 118.643 98.7512 120.322 93.4903C121.026 91.2983 121.001 92.8083 121.001 59.4285C121.001 26.0486 121.026 27.5587 120.322 25.3667C119.717 23.4547 119.038 22.1882 117.717 20.5076C116 18.3278 113.321 16.4767 110.63 15.6121C108.58 14.9423 108.568 14.9423 101.308 14.8936L94.5044 14.8449L91.9363 9.76666C90.5287 6.9779 89.0594 4.16478 88.6767 3.53152C87.4914 1.52216 86.1332 0.438316 84.454 0.121689C84.0342 0.0486221 75.6383 -9.15527e-05 60.3898 0.012085C40.3384 0.012085 36.8813 0.0364456 36.3133 0.194756ZM81.5154 7.76947C82.3797 8.11045 83.4169 9.0238 84.1206 10.0346C85.0343 11.362 86.7629 14.4795 88.7754 18.413L90.751 22.2735L99.0481 22.31C107.246 22.3465 107.37 22.3465 108.16 22.6144C110.518 23.406 112.407 25.2936 113.136 27.5831L113.408 28.4355V59.4894V90.5432L113.074 91.4322C112.605 92.7231 112.049 93.5634 111.049 94.5011C110.025 95.4631 108.777 96.1208 107.481 96.3887C106.172 96.6566 14.8296 96.6566 13.5208 96.3887C12.2368 96.1208 11.0268 95.4875 9.97727 94.5133C8.96482 93.5756 8.40921 92.7475 7.92768 91.4322L7.59431 90.5432V59.4285V28.3137L7.92768 27.4247C8.11288 26.9254 8.44625 26.2313 8.66849 25.8538C9.27349 24.8674 10.6687 23.613 11.7429 23.0894C13.3727 22.2978 13.4838 22.2856 22.3119 22.2856H30.2509L32.0536 18.7175C33.8192 15.2467 35.9923 11.3376 36.9183 9.98586C37.4492 9.21865 38.4246 8.28094 38.9926 7.98867C40.0915 7.42848 39.4494 7.44067 60.7479 7.46502L80.8117 7.48937L81.5154 7.76947Z" fill="black"/>
          <path d="M58.0931 29.7872C53.9075 30.2256 50.6232 31.1268 47.2278 32.7586C44.2645 34.1835 41.931 35.7788 39.5974 37.9952C34.671 42.6472 31.5966 48.5291 30.5347 55.2879C30.2384 57.212 30.2384 61.5961 30.5347 63.5689C31.5595 70.2547 34.6833 76.2219 39.5974 80.8617C44.1411 85.1605 49.8207 87.8762 56.3028 88.8626C58.303 89.1671 62.7109 89.1549 64.7605 88.8504C73.428 87.5596 80.8238 82.9563 85.7009 75.8322C86.775 74.249 88.269 71.3629 88.9605 69.4874C89.5531 67.9165 90.1828 65.4444 90.4544 63.6298C90.7631 61.6205 90.7755 57.2607 90.4668 55.2879C88.9728 45.6064 82.9845 37.3619 74.2306 32.9657C71.4155 31.553 68.0201 30.4814 64.8222 30.0186C63.464 29.8237 59.2043 29.6776 58.0931 29.7872ZM64.5135 37.4959C68.9955 38.2753 73.2798 40.4917 76.5518 43.7188C85.3798 52.4261 85.3798 66.4308 76.5518 75.138C72.8601 78.7914 68.1188 81.0078 62.822 81.5802C54.4384 82.4935 45.8326 78.4017 41.3507 71.3629C39.3011 68.16 38.2392 64.9938 37.8935 61.0725C37.5108 56.8832 38.5849 52.2069 40.7704 48.4317C44.351 42.2575 50.6849 38.1657 58.0314 37.2645C59.5007 37.094 62.822 37.2158 64.5135 37.4959Z" fill="black"/>
          <path d="M43 59.3603H60.1905M60.1905 59.3603H77.3809M60.1905 59.3603V40M60.1905 59.3603V78.7207" stroke="#2963A4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_361_3">
            <rect width="121" height="104" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.addFile {
  display: flex;
  align-items: center;
  gap: rem(20);
  cursor: pointer;

  .text{
    p{
      font-size: rem(14);
    }
    .color_blackLight{
      margin-top: rem(14);
    }
  }

  input {
    display: none;
  }

  .inputField{
    border-radius: 5px;
    padding: rem(8) 0;
    display: flex;
    justify-content: center;
    max-width: rem(55);
    svg{
      max-width: 80%;
      path{
        fill: $color_subBg;
      }
    }
  }

}
</style>