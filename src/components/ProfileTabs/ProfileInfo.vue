<script setup>
import ActionButton from "@/components/UI/Button/ActionButton";
import MainButton from "@/components/UI/Button/MainButton";
import {ref, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const sex = ref("female");

const width = computed(() => mainStore.display_width);
const user = computed(() => profileStore.user);
const fullAddress = computed(() => profileStore.fullAddress);
const maskPhone = computed(() => {
  const regex = /(\+7 \(\d{3}\)) \d{3}/;
  return user.value.phone ? user.value.phone.replace(regex, '$1 ***') : '';

});

const changeSex = (value) => {
  sex.value = value
}

const openEditPersonalForm = () => {
  mainStore.popup = 'edit-personal';
}
</script>

<template>
  <section class="profileInfo profileTab">
    <header
        v-if="width > 1024"
        class="profileTab__header"
    >
      <h2 class="textMontserrat_medium">
        Личная информация
      </h2>
    </header>
    <main class="profileInfo__main">
      <div
          class="profileInfo__userData fraction"
          :class="{'profileInfo__mobile':width < 768}"
      >
        <!--        <ul
                    v-if="width > 768"
                    class="userInfo__table textMontserrat_light">
                  <li>
                    <p>Фамилия</p>

                  </li>
                  <li>
                    <p>Имя</p>

                  </li>
                  <li>
                    <p>Отчество</p>

                  </li>
                </ul>-->
        <ul class="textMontserrat_regular">
          <li>
            <p class="profileInfo_FIO">
              {{ user.name }}
            </p>
            <!--            <svg
                            v-if="width < 768"
                            xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                          <g clip-path="url(#clip0_395_103)">
                            <path
                                d="M18.3421 0.0164032C17.8451 0.144373 17.743 0.178825 17.5027 0.298592C17.3053 0.39703 17.1522 0.493826 16.9761 0.631638C16.9037 0.68906 13.3027 4.26726 8.97602 8.58375L1.10596 16.4309L0.929859 17.0953C0.831113 17.4612 0.73895 17.8073 0.722492 17.8664C0.679702 18.0305 0.362069 19.2084 0.334091 19.3102C0.281426 19.512 0.261677 19.5841 0.133307 20.0599L0 20.5554V20.7769V21H0.223824H0.446003L0.943025 20.8671C1.21622 20.7933 1.4779 20.7244 1.52234 20.7129C1.56842 20.6998 1.66387 20.6752 1.73629 20.6555C1.8087 20.6358 2.11646 20.5537 2.41928 20.4734C2.7221 20.3913 3.00846 20.3159 3.0529 20.3027C3.09898 20.2912 3.41661 20.2059 3.76058 20.1141L4.38597 19.9484L12.4025 11.9552C20.3187 4.06219 20.4207 3.96047 20.5441 3.77344C20.6676 3.5864 20.8239 3.28289 20.8766 3.12539C21.1448 2.33789 20.9671 1.57336 20.3614 0.894138C20.0323 0.524998 19.6373 0.255936 19.2308 0.126326C19.0547 0.0705452 18.9724 0.0541382 18.7255 0.0246067C18.5017 -0.00164223 18.4194 -0.00328445 18.3421 0.0164032ZM17.9636 1.1107C18.0771 1.43554 18.3174 1.80961 18.6186 2.12953C18.6795 2.19515 18.7288 2.25586 18.7255 2.26406C18.7223 2.27062 18.1281 2.85797 17.404 3.56836C16.6799 4.27875 15.8586 5.08758 15.5772 5.3632C15.2974 5.64047 14.5667 6.35742 13.9561 6.95625C13.3455 7.55508 12.6049 8.28351 12.3103 8.57226C12.0158 8.86265 10.9839 9.8782 10.0145 10.8281C6.84146 13.9437 6.00705 14.764 5.3652 15.3973C3.26027 17.4743 3.26191 17.4727 3.18127 17.5071C3.06442 17.558 2.87022 17.6039 2.77476 17.6039C2.65133 17.6039 2.58879 17.5645 2.49498 17.4316C2.28103 17.1248 2.24647 16.9575 2.33534 16.6687C2.36497 16.5785 2.39624 16.4423 2.40611 16.3685L2.42422 16.234L9.90588 8.77242C14.0203 4.66758 17.4303 1.2764 17.483 1.23539C17.5883 1.15336 17.8681 0.984373 17.8994 0.984373C17.9092 0.984373 17.9389 1.04179 17.9636 1.1107ZM19.2374 2.65617C19.4941 2.82023 19.7245 2.91047 19.9582 2.94328L20.0948 2.96133L20.0455 3.06633C20.0175 3.12375 19.9549 3.23367 19.9039 3.31242C19.8216 3.43875 18.9774 4.28531 12.1375 11.1054L4.46332 18.7573L4.32672 18.7868C4.15556 18.8245 3.93503 18.8262 3.81983 18.7917C3.65031 18.7425 3.54334 18.5883 3.49397 18.3209C3.47257 18.1962 3.47422 17.8598 3.49726 17.8369C3.50055 17.832 3.51371 17.8369 3.52523 17.8467C3.54169 17.8598 3.81489 17.599 4.67398 16.7541C5.29444 16.1454 6.29342 15.1627 6.89577 14.5704C7.49812 13.9798 8.26505 13.2251 8.59914 12.8953C8.93487 12.5655 9.71991 11.7945 10.3437 11.1809C11.4496 10.0948 11.9318 9.62226 13.1332 8.43937C13.4542 8.12437 14.4433 7.15312 15.3303 6.28195C16.2174 5.41242 17.427 4.22297 18.0212 3.6389C18.6136 3.05484 19.1024 2.57742 19.1057 2.57578C19.109 2.57578 19.1683 2.61187 19.2374 2.65617ZM1.87947 16.8804C1.86301 17.1281 1.97986 17.4251 2.22508 17.7466C2.29585 17.8385 2.42751 17.9386 2.51802 17.9665C2.65627 18.0091 2.94592 18.0124 3.04961 17.973C3.07429 17.9616 3.07759 17.9763 3.07759 18.1338C3.07759 18.626 3.27508 19.0001 3.61246 19.1461C3.65854 19.1658 3.76223 19.1937 3.84616 19.2101L3.99592 19.2363L2.89984 19.5284C2.29585 19.6891 1.79553 19.8187 1.78566 19.8187C1.77743 19.8171 1.68362 19.717 1.57994 19.594C1.47625 19.4726 1.34788 19.3216 1.29357 19.2593L1.19812 19.1461L1.50588 17.9944C1.72806 17.1659 1.82351 16.8312 1.8482 16.8033C1.8663 16.7836 1.88276 16.7672 1.8844 16.7672C1.88605 16.7672 1.8844 16.818 1.87947 16.8804Z"
                                fill="#2963A4"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_395_103">
                              <rect width="21" height="21" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>-->
          </li>
        </ul>
        <ul
            class="userInfo__table textMontserrat_light"
        >
          <li>
            <p>
              Дата рождения
            </p>

          </li>
          <!--          <li>-->
          <!--            <p>-->
          <!--              Пол-->
          <!--            </p>-->

          <!--          </li>-->
        </ul>
        <ul
            class="userInfo__table textMontserrat_regular"
        >
          <time :datetime="user.birth_datetime">
            {{ user.birth_datetime }}
          </time>
          <!--          <li>-->
          <!--            Женский-->
          <!--          </li>-->
        </ul>
<!--        <div
            v-if="width < 768"
            class="profileInfo__birthDay"
        >
          <div class="day birthDay__item border_subBg">
            <p class="textMontserrat_regular">
              31
            </p>
          </div>
          <div class="muns birthDay__item border_subBg">
            <p class="textMontserrat_regular">
              Август
            </p>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px"
                 width="30px" height="30px" viewBox="0 0 960 560" enable-background="new 0 0 960 560"
                 xml:space="preserve">
                  <g id="Rounded_Rectangle_33_copy_4_1_">
	                  <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
		                   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
		                  c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
                </g>
            </svg>

          </div>
          <div class="years birthDay__item border_subBg">
            <p class="textMontserrat_regular">
              2000
            </p>
          </div>
        </div>-->
<!--        <div
            v-if="width < 768"
            class="sex"
        >
          <div
              class="sex__item border_subBg"
              :class="{'background_accent color_colorBg':sex === 'female'}"
              @click="changeSex('female')"
          >
            Ж
          </div>
          <div
              :class="{'background_accent color_colorBg':sex === 'male'}"
              class="sex__item border_subBg"
              @click="changeSex('male')"
          >
            М
          </div>
        </div>-->
      </div>
      <div
          :class="{'profileInfo__mobile':width < 768}"
          class="profileInfo__region fraction"
      >
        <p class="textMontserrat_light">
          Адресная информация
        </p>
        <div class="takeYourCounty">
          {{ fullAddress }}
        </div>
<!--        <div
            v-if="width > 768"
            class="enterManually color_accent"
        >
          <p class="textMontserrat_medium">
            Ввести данные вручную
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
            <line x1="1.4453" y1="13.5321" x2="12.2187" y2="6.34983" stroke="#E9605A" stroke-width="2"/>
            <line y1="-1" x2="12.948" y2="-1" transform="matrix(0.83205 0.5547 0.5547 -0.83205 2 -6.10352e-05)"
                  stroke="#E9605A" stroke-width="2"/>
          </svg>
        </div>-->
      </div>
      <div
          :class="{'profileInfo__mobile':width < 768}"
          class="profileInfo__mail"
      >
        <p class="textMontserrat_light">
          Почтовый ящик
        </p>
        <div class="fraction textMontserrat_regular">
          <div
              class="contentField__item"
              :class="{'border_subBg':width < 768}"
          >
            <p>
              {{ user.email }}
            </p>
<!--            <p
                v-if="width > 768"
                class="color_green"
            >
              Подтверждена
            </p>-->
            <svg v-if="width < 768"
                 data-v-72af2f0f="" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"
                 fill="none">
              <g data-v-72af2f0f="" clip-path="url(#clip0_395_103)">
                <path data-v-72af2f0f=""
                      d="M18.3421 0.0164032C17.8451 0.144373 17.743 0.178825 17.5027 0.298592C17.3053 0.39703 17.1522 0.493826 16.9761 0.631638C16.9037 0.68906 13.3027 4.26726 8.97602 8.58375L1.10596 16.4309L0.929859 17.0953C0.831113 17.4612 0.73895 17.8073 0.722492 17.8664C0.679702 18.0305 0.362069 19.2084 0.334091 19.3102C0.281426 19.512 0.261677 19.5841 0.133307 20.0599L0 20.5554V20.7769V21H0.223824H0.446003L0.943025 20.8671C1.21622 20.7933 1.4779 20.7244 1.52234 20.7129C1.56842 20.6998 1.66387 20.6752 1.73629 20.6555C1.8087 20.6358 2.11646 20.5537 2.41928 20.4734C2.7221 20.3913 3.00846 20.3159 3.0529 20.3027C3.09898 20.2912 3.41661 20.2059 3.76058 20.1141L4.38597 19.9484L12.4025 11.9552C20.3187 4.06219 20.4207 3.96047 20.5441 3.77344C20.6676 3.5864 20.8239 3.28289 20.8766 3.12539C21.1448 2.33789 20.9671 1.57336 20.3614 0.894138C20.0323 0.524998 19.6373 0.255936 19.2308 0.126326C19.0547 0.0705452 18.9724 0.0541382 18.7255 0.0246067C18.5017 -0.00164223 18.4194 -0.00328445 18.3421 0.0164032ZM17.9636 1.1107C18.0771 1.43554 18.3174 1.80961 18.6186 2.12953C18.6795 2.19515 18.7288 2.25586 18.7255 2.26406C18.7223 2.27062 18.1281 2.85797 17.404 3.56836C16.6799 4.27875 15.8586 5.08758 15.5772 5.3632C15.2974 5.64047 14.5667 6.35742 13.9561 6.95625C13.3455 7.55508 12.6049 8.28351 12.3103 8.57226C12.0158 8.86265 10.9839 9.8782 10.0145 10.8281C6.84146 13.9437 6.00705 14.764 5.3652 15.3973C3.26027 17.4743 3.26191 17.4727 3.18127 17.5071C3.06442 17.558 2.87022 17.6039 2.77476 17.6039C2.65133 17.6039 2.58879 17.5645 2.49498 17.4316C2.28103 17.1248 2.24647 16.9575 2.33534 16.6687C2.36497 16.5785 2.39624 16.4423 2.40611 16.3685L2.42422 16.234L9.90588 8.77242C14.0203 4.66758 17.4303 1.2764 17.483 1.23539C17.5883 1.15336 17.8681 0.984373 17.8994 0.984373C17.9092 0.984373 17.9389 1.04179 17.9636 1.1107ZM19.2374 2.65617C19.4941 2.82023 19.7245 2.91047 19.9582 2.94328L20.0948 2.96133L20.0455 3.06633C20.0175 3.12375 19.9549 3.23367 19.9039 3.31242C19.8216 3.43875 18.9774 4.28531 12.1375 11.1054L4.46332 18.7573L4.32672 18.7868C4.15556 18.8245 3.93503 18.8262 3.81983 18.7917C3.65031 18.7425 3.54334 18.5883 3.49397 18.3209C3.47257 18.1962 3.47422 17.8598 3.49726 17.8369C3.50055 17.832 3.51371 17.8369 3.52523 17.8467C3.54169 17.8598 3.81489 17.599 4.67398 16.7541C5.29444 16.1454 6.29342 15.1627 6.89577 14.5704C7.49812 13.9798 8.26505 13.2251 8.59914 12.8953C8.93487 12.5655 9.71991 11.7945 10.3437 11.1809C11.4496 10.0948 11.9318 9.62226 13.1332 8.43937C13.4542 8.12437 14.4433 7.15312 15.3303 6.28195C16.2174 5.41242 17.427 4.22297 18.0212 3.6389C18.6136 3.05484 19.1024 2.57742 19.1057 2.57578C19.109 2.57578 19.1683 2.61187 19.2374 2.65617ZM1.87947 16.8804C1.86301 17.1281 1.97986 17.4251 2.22508 17.7466C2.29585 17.8385 2.42751 17.9386 2.51802 17.9665C2.65627 18.0091 2.94592 18.0124 3.04961 17.973C3.07429 17.9616 3.07759 17.9763 3.07759 18.1338C3.07759 18.626 3.27508 19.0001 3.61246 19.1461C3.65854 19.1658 3.76223 19.1937 3.84616 19.2101L3.99592 19.2363L2.89984 19.5284C2.29585 19.6891 1.79553 19.8187 1.78566 19.8187C1.77743 19.8171 1.68362 19.717 1.57994 19.594C1.47625 19.4726 1.34788 19.3216 1.29357 19.2593L1.19812 19.1461L1.50588 17.9944C1.72806 17.1659 1.82351 16.8312 1.8482 16.8033C1.8663 16.7836 1.88276 16.7672 1.8844 16.7672C1.88605 16.7672 1.8844 16.818 1.87947 16.8804Z"
                      fill="#2963A4"></path>
              </g>
              <defs data-v-72af2f0f="">
                <clipPath data-v-72af2f0f="" id="clip0_395_103">
                  <rect data-v-72af2f0f="" width="21" height="21" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
          :class="{'profileInfo__mobile':width < 768}"
          class="profileInfo__phone"
      >
        <p class="textMontserrat_light">
          Мобильный телефон
        </p>
        <div class="textMontserrat_regular">
          <div
              class="contentField__item"
              :class="{'border_subBg':width < 768}"
          >
            <p>
              {{ maskPhone }}
            </p>
<!--            <p
                v-if="width > 768"
                class="color_green"
            >
              Подтвержден
            </p>-->
          </div>
        </div>
      </div>
    </main>
    <footer class="profileInfo__footer">
      <div class="buttonContainer">
        <main-button
            button-text="Редактировать"
            @click="openEditPersonalForm"
        />
<!--        <action-button
            text="Отменить"
        />
        <main-button
            button-text="Сохранить"
        />-->
      </div>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.profileInfo {

  &_FIO {
    margin-bottom: rem(20);
  }

  &__main {
    margin-top: rem(20);
  }

  &__userData {
    //max-width: rem(885);
    //border-bottom: 1px solid #2963a44a;
    //padding-bottom: rem(20);

    button {
      max-width: rem(200);
      margin-top: rem(10);
    }

    .userInfo__table {
      display: grid;
      grid-template-columns: repeat(3, 200px);
      margin-top: rem(10);
    }

    .textMontserrat_regular {
      margin-top: rem(15);
      font-size: rem(16);
    }
  }

  &__region {
    //border-bottom: 1px solid $color_subBg;
    margin-top: rem(12);

    .takeYourCounty {
      margin-top: rem(20);
      //padding: rem(13) rem(20);
    }

    .enterManually {
      cursor: pointer;
      margin-top: rem(17);
      display: flex;
      align-items: center;
      gap: rem(41);
    }
  }

  &__mail {
    margin-top: rem(12);
  }

  &__phone {
    margin-top: rem(12);
  }

  &__footer {
    margin-top: rem(30);
    display: flex;
    justify-content: center;

  }

  .fraction {
    padding-bottom: rem(12);
  }

  .contentField {
    //border-bottom: 1px solid $color_subBg;
    //padding-bottom: rem(20);

    &__item {
      max-width: rem(600);
      margin-top: rem(20);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
    }
  }

  .buttonContainer {
    max-width: rem(472);
    width: 100%;
    display: flex;
    gap: rem(30);

    button {
      width: 40%;
      margin: 0 auto;
    }
  }

  @media (max-width: em(1024, 16)) {
    &__region {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
    }
  }
  @media (max-width: em(768, 16)) {
    padding: 0;

    &__userData {
      border: 0;
      padding-bottom: 0;
    }

    .userInfo__table {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: rem(10);

      li {
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }
    }

    .changeData {
      padding: rem(11) rem(10) rem(11) rem(37);
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }
    }

    &__birthDay {
      max-width: 80%;
      margin-top: rem(33);
      display: flex;

      .day, .years {
        flex: 1 1 20%;
      }

      .muns {
        flex: 1 1 60%;
        gap: rem(15);
      }

      .birthDay__item {
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .textMontserrat_regular {
        margin-top: 0;
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }

      svg {
        path {
          fill: $color_accent;
        }
      }
    }

    .sex {
      margin-top: rem(10);
      display: flex;

      &__item {
        border-radius: 2px;
        padding: rem(11) rem(19);
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));

      }
    }

    &__region {
      margin-top: rem(33);
      border-bottom: 0;
      padding: 0;

      .textMontserrat_light {
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }

      .takeYourCounty {
        margin-top: rem(10);
      }
    }

    &__mail {
      margin-top: rem(33);
    }

    &__phone {
      margin-top: rem(33);
    }

    .contentField {
      width: 100%;
      margin-right: rem(10);
      max-width: 100%;
      padding: 0;
      border: none;

      &__item {
        max-width: 100%;
        padding: rem(12) rem(15) rem(12) rem(35);
        grid-template-columns: 2fr 0.2fr;

        svg {
          justify-self: end;
        }
      }
    }
    &__footer {
      margin-top: rem(50);
    }
    .buttonContainer {
      max-width: 100%;
      flex-direction: column;
      gap: rem(10);

      .button_actionButton {
        max-width: 100%;
        padding: 0.625rem 0;
      }

      .button {
        flex: 1 1 100%;
      }
    }
  }
}
</style>