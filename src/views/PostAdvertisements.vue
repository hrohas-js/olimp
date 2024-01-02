<script setup>
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import ActionButton from "@/components/UI/Button/ActionButton";
import TextAreaWithBorder from "@/components/UI/Inputs/TextAreaWithBorder";
import AddFile from "@/components/UI/AddFile";
import MainButton from "@/components/UI/Button/MainButton";
import {useAnnouncementStore} from "@/store/AnnouncementStore";
import {useProfileStore} from "@/store/ProfileStore";
import {computed, ref} from "vue";
import {validateField} from "@/plugins/validator";
import MiniGallery from "@/components/UI/MiniGallery";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const announcementStore = useAnnouncementStore();
const profileStore = useProfileStore();
const router = useRouter();

const parameters = computed(() => announcementStore.newItem.parameters);
const categories = computed(() => announcementStore.newItem.categories);
const title = computed(() => announcementStore.newItem.title);
const price = computed(() => announcementStore.newItem.price);
const location = computed(() => announcementStore.newItem.location);
const user = computed(() => profileStore.user);

const createTrigger = ref(false);

const titleValue = computed({
  get() {
    return announcementStore.newItem.title;
  },
  set(value) {
    announcementStore.newItem.title = validateField('title', value).message;
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

const chanceInput = (e) => {
  e.target.value = validateField('description', e.target.value).message;
}

const create = (status) => {
  createTrigger.value = true;
  let flag = false;
  document.querySelectorAll('.param.list').forEach(elem => {
    const name = elem.querySelector('p')?.innerText || '';
    const textInput = elem.querySelector('input[type="text"]');
    const checkedRadioInput = elem.querySelector('input[type="radio"]:checked');

    const value = textInput?.value || checkedRadioInput?.value || '';

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
  if (!flag) {
    announcementStore.createAnnouncement({
      title: title.value,
      gallery: JSON.stringify(announcementStore.newItem.gallery),
      description: announcementStore.newItem.description,
      parameters: JSON.stringify(announcementStore.newItem.selectedParameters),
      categories: JSON.stringify(categories.value),
      location: location.value,
      price: price.value,
      status: status,
      phone: announcementStore.newItem.phone,
      user_id: user.value.id
    }).then(() => {
      router.push('/profile');
    });
  }
}
</script>

<template>
  <section class="postAdvertisements textMontserrat wrapper">
    <search-header/>
    <main class="postAdvertisements__main">
      <h3 class="title textMontserrat_medium">
        Параметры
      </h3>
      <div class="container">
        <div class="postAdvertisements__item">
          <p class="textMontserrat_light">
            Название объявления
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
          <p class="textMontserrat_light">
            {{ param.name }}
          </p>
          <input-announcement
              v-if="param.content.length === 0"
              @input="chanceInput"
          />
          <ul v-else class="paramList">
            <li
                v-for="paramVariant in JSON.parse(param.content)"
                :key="paramVariant.id"
                class="textMontserrat_light"
            >
              <input
                  type="radio"
                  :name="param.slug"
                  :id="paramVariant.slug"
                  :checked="categories[3] === paramVariant.id"
              />
              <label :for="paramVariant.slug">
                {{ paramVariant.name }}
              </label>
            </li>
          </ul>
        </div>
        <div class="postAdvertisements__item">
          <p class="textMontserrat_light">
            Описание
          </p>
          <text-area-with-border v-model="descriptionValue" />
        </div>
        <div class="postAdvertisements__item ">
          <p class="textMontserrat_light">
            Цена
          </p>
          <div class="priceContainer">
            <input-announcement
                v-model="priceValue"
                :class="{'border_accent': createTrigger && price.length === 0}"
            />
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_light">
            Фотографии
          </p>
          <div class="addContent">
            <add-file/>
            <mini-gallery/>
<!--            <div class="linkYouTube">
              <p class="textMontserrat_light">
                Фотографии и видео
              </p>
              <input-border
                  placeholder="Ссылка на видео"
              />
            </div>-->
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_light">
            Локация
          </p>
          <div class="mapArea">
            <input-announcement
                v-model="locationValue"
                :class="{'border_accent': createTrigger && location.length === 0}"
            />
          </div>
        </div>
        <div class="postAdvertisements__item param">
          <p class="textMontserrat_light">
            Контакты
          </p>
          <div class="contacts">
            <div class="phone">
              <p class="textMontserrat_light">
                Телефон
              </p>
              <input-announcement
                  v-model="phoneValue"
                  placeholder="+7 999 999-99-99"
              />
            </div>
<!--            <div class="options">
              <p class="textMontserrat_light">
                Способ связи
              </p>
              <ul class="optionsList">
                <li>
                  <input type="radio" id="111" class="custom-radio" name="changeOptions">
                  <label for="111">
                    Звонки и сообщения
                  </label>
                </li>
                <li>
                  <input type="radio" id="222" class="custom-radio" name="changeOptions">
                  <label for="222">Только звонки</label>
                </li>
                <li>
                  <input type="radio" id="333" class="custom-radio" name="changeOptions">
                  <label for="333">
                    Только сообщения
                  </label>
                </li>
              </ul>
            </div>-->
          </div>
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

    .title {
      font-size: rem(24);
      padding-bottom: rem(20);
    }
  }

  &__item {
    margin-top: rem(50);
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;

    &:first-child {
      margin-top: 0;
    }

    .textMontserrat_light {
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
      gap: rem(20);

      .input {
        flex: 1 1 70%;
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
    }

    .textMontserrat_light {
      font-size: rem(20);
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
    }
    .options{
      margin-top: rem(65);
      display: flex;
      gap: rem(60);
      ul{
        display: flex;
        flex-direction: column;
        gap: rem(45);
      }
    }
  }

  &__footer{
    margin-top: rem(100);
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
  }
}
</style>