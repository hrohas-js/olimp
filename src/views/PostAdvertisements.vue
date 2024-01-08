<script setup>
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import ActionButton from "@/components/UI/Button/ActionButton";
import TextAreaWithBorder from "@/components/UI/Inputs/TextAreaWithBorder";
import AddFile from "@/components/UI/AddFile";
import MainButton from "@/components/UI/Button/MainButton";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {useProfileStore} from "@/store/ProfileStore";
import {computed, onUnmounted, ref, watch} from "vue";
import {validateField} from "@/plugins/validator";
import MiniGallery from "@/components/UI/MiniGallery";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
  YandexMapMarker,
  YandexMapDefaultFeaturesLayer
} from 'vue-yandex-maps';
import CustomSelect from "@/components/UI/Inputs/CustomSelect";
import ChooseBox from "@/components/UI/Inputs/ChooseBox";

const announcementStore = useAnnouncementStore();
const profileStore = useProfileStore();
const router = useRouter();

const newItem = computed(() => announcementStore.newItem);
const parameters = computed(() => newItem.value.parameters);
const categories = computed(() => newItem.value.categories);
const title = computed(() => newItem.value.title);
const price = computed(() => newItem.value.price);
const location = computed(() => newItem.value.location);
const user = computed(() => profileStore.user);
const communication = computed(() => newItem.value.communication);
const marker = computed(() => newItem.value.marker);
const video = computed(() => newItem.value.video);

const createTrigger = ref(false);
const payAgreementCheck = ref(false);
const inputValues = ref({});
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

const titleValue = computed({
  get() {
    return announcementStore.newItem.title;
  },
  set(value) {
    if (value.length > 50) {
      announcementStore.newItem.title = validateField('title', value.slice(0, -1)).message;
    } else {
      announcementStore.newItem.title = validateField('title', value).message;
    }
  }
});
const descriptionValue = computed({
  get() {
    return announcementStore.newItem.description;
  },
  set(value) {
    announcementStore.newItem.description = validateField('description', value).message;
  }
});
const priceValue = computed({
  get() {
    return announcementStore.newItem.price;
  },
  set(value) {
    announcementStore.newItem.price = validateField('price', value).message;
  }
});
const locationValue = computed({
  get() {
    return announcementStore.newItem.location;
  },
  set(value) {
    announcementStore.newItem.location = validateField('message', value).message;
  }
});
const phoneValue = computed({
  get() {
    return announcementStore.newItem.phone;
  },
  set(value) {
    announcementStore.newItem.phone = validateField('phone', value).message;
  }
});
const communicationValue = computed({
  get() {
    return announcementStore.newItem.communication;
  },
  set(value) {
    announcementStore.newItem.communication = value;
  }
});
const videoValue = computed({
  get() {
    return announcementStore.newItem.video;
  },
  set(value) {
    announcementStore.newItem.video = value;
  }
});

const breadcrumbs = computed(() => {
  let str = '';
  announcementStore.newItem.selectedCategories.forEach((elem, index) => {
    str += elem.replace(/<br\s*\/?>/gi, ' ');
    if (index !== announcementStore.newItem.selectedCategories.length - 1) {
      str += ' / '
    }
  });
  return str;
});
const priceInputLabel = computed(() => {
  let str = 'Цена';
  if (categories.value.length > 0) {
    if (categories.value[0].id === 1 || categories.value[0].id === 2) {
      str = 'Оплата';
    }
  }
  return str;
});
const isActor = computed(() => {
  let flag = false;
  if (categories.value.length > 0) {
    const arr = categories.value;
    console.log(arr);
    if ((arr[2].id === 30 || arr[2].id === 51) && (arr[3].id === 1 || arr[3].id === 2 || arr[3].id === 6)) {
      flag = true;
    }
  }
  return flag
});

watch(newItem.value, () => {
  localStorage.setItem('newItem', JSON.stringify(newItem.value))
});

onUnmounted(() => {
  announcementStore.newItem = {
    title: '',
    description: '',
    categories: [],
    price: '0',
    parameters: [],
    gallery: [],
    location: '',
    phone: '',
    selectedParameters: [],
    status: '',
    communication: '',
    marker: {
      coordinates: [37.617644, 55.755819]
    },
    video: '',
    selectedCategories: []
  }
  localStorage.removeItem('newItem');
});

const updateInputValue = (paramId, value) => {
  inputValues.value[paramId] = validateField('description', value).message;
};

const setMarker = (object, event) => {
  announcementStore.fetchMap('coordinates', event.coordinates.join(', '));
  announcementStore.newItem.marker.coordinates = event.coordinates;
}

const setMapAddress = () => {
  announcementStore.fetchMap('address', location.value)
}

const create = (status) => {
  createTrigger.value = true;
  let flag = false;
  document.querySelectorAll('.param.list').forEach(elem => {
    const name = elem.querySelector('p')?.innerText || '';
    const textInput = elem.querySelector('input[type="text"]');
    const selectInput = elem.querySelector('select');
    const selectChoose = elem.querySelector('.choose-box__item.active').innerText;

    const value = textInput?.value || selectInput?.value || selectChoose || '';

    announcementStore.newItem.selectedParameters.push({ name, value });
  });
  announcementStore.newItem.status = status;
  if (title.value.length === 0) {
    ElMessage.error('Название объявления обязательно для заполнения')
    flag = true;
  }
  if (price.value.length === 0) {
    ElMessage.error('Цена обязательна для заполнения')
    flag = true;
  }
  if (location.value.length === 0) {
    ElMessage.error('Локация обязательна для заполнения')
    flag = true;
  }
  if (communication.value.length === 0) {
    ElMessage.error('Выберете способ связи!')
    flag = true;
  }
  if (!flag) {
    announcementStore.createAnnouncement({
      title: title.value,
      gallery: JSON.stringify(announcementStore.newItem.gallery),
      description: announcementStore.newItem.description,
      parameters: JSON.stringify(announcementStore.newItem.selectedParameters),
      categories: JSON.stringify(categories.value),
      location: location.value,
      price: payAgreementCheck.value ? 'оплата по договоренности' : price.value,
      status: status,
      phone: announcementStore.newItem.phone,
      user_id: user.value.id,
      communication: communication.value,
      video: video.value
    }).then(() => {
      router.push('/profile');
    });
  }
}

const setPayAgreement = (e) => {
  const input = document.querySelector('.priceContainer .price');
  if (e.target.checked) {
    input.setAttribute('disabled', 'true');
    input.classList.add('background_gray');
  } else {
    input.removeAttribute('disabled');
    input.classList.remove('background_gray');
  }
}
</script>

<template>
  <section class="postAdvertisements textMontserrat wrapper">
    <search-header />
    <main class="postAdvertisements__main">
      <h3 class="textMontserrat_medium">
        {{ breadcrumbs }}
      </h3>
      <h3 class="title textMontserrat_medium">
        Создать объявление
      </h3>
      <div class="container">
        <div class="postAdvertisements__item">
          <p class="textMontserrat_regular">
            Название<br>объявления
          </p>
          <input-announcement
              v-model="titleValue"
              :class="{'border_accent': createTrigger && title.length === 0}"
          />
        </div>
        <div
            v-for="param in parameters"
            :key="param.id"
            class="postAdvertisements__item param list"
        >
          <p class="textMontserrat_regular">
            {{ param.name }}
          </p>
          <input-announcement
              v-if="param.content.length === 0"
              v-model="inputValues[param.id]"
              @input="updateInputValue(param.id, $event.target.value)"
          />
          <custom-select
              v-else-if="JSON.parse(param.content).length > 2"
              :options="JSON.parse(param.content)"
          />
          <choose-box
              v-else
              :chooses="JSON.parse(param.content)"
          />
        </div>
        <div class="postAdvertisements__item">
          <p class="textMontserrat_regular">
            Дополнительная информация
          </p>
          <text-area-with-border v-model="descriptionValue" />
        </div>
        <div
            v-if="!isActor"
            class="postAdvertisements__item"
        >
          <p class="textMontserrat_regular">
            {{ priceInputLabel }}
          </p>
          <div class="priceContainer">
            <input-announcement
                v-model="priceValue"
                class="price"
                :class="{'border_accent': createTrigger && price.length === 0}"
            />
            <div class="pay-agreement">
              <input
                  v-model="payAgreementCheck"
                  id="agreement"
                  type="checkbox"
                  @change="setPayAgreement"
              />
              <label
                  for="agreement"
                  class="textMontserrat_medium"
              >
                Оплата по договоренности
              </label>
            </div>
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_regular">
            Фотографии
          </p>
          <div class="addContent">
            <add-file />
            <mini-gallery />
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_regular">
            Ссылка на видео (YouTube)
          </p>
          <input-announcement v-model="videoValue" />
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_regular">
            Локация
          </p>
          <div class="mapArea">
            <input-announcement
                v-model="locationValue"
                :class="{'border_accent': createTrigger && location.length === 0}"
                @blur="setMapAddress"
            />
            <yandex-map
                :settings="{
                  location: {
                    center: marker?.coordinates.length > 0 ? marker?.coordinates : [37.617644, 55.755819],
                    zoom: 9,
                  },
                }"
                width="100%"
                height="300px"
            >
              <yandex-map-default-scheme-layer/>
              <yandex-map-default-features-layer/>
              <yandex-map-listener :settings="{ onClick: setMarker }" />
              <yandex-map-marker :settings="marker">
                <template #default>
                  <div :style="styleObject"/>
                </template>
              </yandex-map-marker>
            </yandex-map>
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_regular">
            Контакты для связи
          </p>
          <div class="contacts">
            <div class="phone">
              <input-announcement
                  v-model="phoneValue"
                  placeholder="+7 999 999-99-99"
              />
            </div>
            <div class="options">
            </div>
          </div>
        </div>
        <div class="postAdvertisements__item param options">
          <p class="textMontserrat_regular">
            Предпочитаемый способ связи
          </p>
          <ul class="optionsList">
            <li>
              <input
                  v-model="communicationValue"
                  type="radio"
                  id="111"
                  class="custom-radio"
                  name="changeOptions"
                  value="call+message"
              />
              <label for="111">
                Звонки и сообщения
              </label>
            </li>
            <li>
              <input
                  v-model="communicationValue"
                  type="radio"
                  id="222"
                  class="custom-radio"
                  name="changeOptions"
                  value="call"
              />
              <label for="222">
                Только звонки
              </label>
            </li>
            <li>
              <input
                  v-model="communicationValue"
                  type="radio"
                  id="333"
                  class="custom-radio"
                  name="changeOptions"
                  value="message"
              />
              <label for="333">
                Только сообщения
              </label>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer class="postAdvertisements__footer">
      <main-button button-text="Разместить объявление" @click="create('publish')"/>
      <action-button text="Сохранить и выйти" @click="create('draft')"/>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.postAdvertisements {
  &__header {
    margin-top: rem(40);

    .textMontserrat_medium {
      font-size: rem(32);
    }
  }

  &__main {
    margin-top: rem(20);

    .container {
      width: 60%;
      margin: 0 auto;
    }

    .title {
      font-size: rem(24);
      padding-bottom: rem(20);
    }
  }

  &__item {
    margin-top: rem(20);
    display: grid;
    grid-template-columns: 0.8fr 3fr;
    align-items: start;

    &:first-child {
      margin-top: 0;
    }

    .textMontserrat_regular {
      max-width: rem(300);
    }

    .buttonContainer {
      display: flex;
      max-width: rem(301);

      button {
        flex: 1 1 50%;
      }

      button:first-child {
        border-top-right-radius: unset;
        border-bottom-right-radius: unset;
      }

      button:last-child {
        border-top-left-radius: unset;
        border-bottom-left-radius: unset;
        border-left: unset;
      }
    }

    .chooseMaker {
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      justify-content: flex-end;

      svg path {
        cursor: pointer;
        fill: $color_accent;
      }
    }


    .paramList {
      display: flex;
      flex-direction: column;
      gap: rem(50);

      li {
        display: flex;
        gap: rem(24);
      }
    }

    .onOf {
      max-width: rem(120);
    }

    .priceContainer {
      max-width: rem(800);
      display: flex;
      flex-direction: column;
      gap: rem(10);

      .price {
        width: 20%;
      }

      .priceModal {
        cursor: pointer;
        border-radius: 5px;
        flex: 1 1 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: rem(30);
      }

      .pay-agreement {
        display: flex;
        align-items: center;
        gap: rem(5);
      }
    }

    .addFile {
      max-width: rem(350);
    }
    .linkYouTube{
      margin-top: rem(50);
      display: flex;
      align-items: center;
      gap: rem(21);

      input{
        max-width: rem(600);
      }
    }
    .mapArea{
      display: flex;
      flex-direction: column;
      gap: rem(36);
      .map{
        border-radius: 5px;
      }
    }
    .phone{
      display: flex;
      align-items: center;
      gap: rem(31);

      input {
        width: 30%;
      }
    }
  }

  .options{
    ul{
      display: flex;
      flex-direction: column;
      gap: rem(20);
    }
  }

  &__footer{
    margin: rem(70) auto 0;
    max-width: rem(573);
    display: flex;
    gap: rem(20);
    button{
      max-width: 100%;
      flex: 1 1 50%;
    }
  }
  .param {
    align-items: start;
    justify-content: space-between;
  }
}
</style>