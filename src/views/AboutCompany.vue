<script setup>
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <section class="about">
    <div class="wrapper">
      <header-banner-mobile v-if="width <= 768" />
      <search-header v-if="width > 1024"/>
      <div class="content">
        <h2 class="textMontserrat textMontserrat_medium">
          О Компании
        </h2>
        <div class="textMontserrat textMontserrat_medium">
          <p>
            Мы рады приветствовать Вас на площадке, где надеемся Вам будет легко ,
            комфортно и интересно работать.
          </p>
          <p>
            Площадка предназначена для представителей творческих профессий и
            специалистов востребованных при реализации того или иного творческого
            проекта.
          </p>
          <p>
            Здесь Вы сможете подобрать профессиональную команду на проект или
            мероприятие, найти работу, найти требуемую локацию, технику, транспорт и
            многое другое, что позволит Вам сэкономить много сил, времени и средств.
            Так же у Вас будет возможность принимать участие в мероприятиях, которые
            будут Вам интересны.
          </p>
          <p>
            Сайт создан при поддержке и курируется продюсерами режиссёрами и
            ведущими специалистами в своей области.
          </p>
          <p>
            На данный момент присутствует стартовая комплектация сайта, которая
            будет развиваться, так же учитывая пожелания и предложения участников
            площадки.
          </p>
          <p>
            Планируется включение различных дополнительных и важных функций и
            возможностей. Так же, запланировано проведение различных мероприятий
            принять участие в которых смогут только члены клуба Production City.
            Мы приложим все силы, что бы помочь Вам реализовать свои самые смелые
            проекты и начинания.
          </p>
          <p>
            С уважением администрация сайта Production City.
          </p>
          <p>
            Учредитель компания ООО «Возможно все! продакшен».
          </p>
          <p>
            Компания основана в 2022г. как отдельное самостоятельное подразделение
            по реализации кино-видео проектов и различных творческих мероприятий.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  max-width: 60%;
  margin: 0 auto;

  @media (max-width: em(768, 16)) {
    max-width: 100%;
  }

  h2 {
    font-size: rem(36);
    margin-top: rem(40);
    margin-bottom: rem(20);
  }
  div.textMontserrat_medium {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    font-size: rem(14);
  }
}
</style>