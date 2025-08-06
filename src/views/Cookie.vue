<script setup>
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <section class="question">
    <div class="wrapper">
      <header-banner-mobile v-if="width <= 768" />
      <search-header v-if="width > 1024"/>
      <div class="content">
        <h2 class="textMontserrat textMontserrat_medium">
          Политика использования файлов куки (cookie)
        </h2>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            1.Общие положения
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          Настоящая Политика использования файлов cookie (далее – Политика)
          применяется к интернет платформе Production City, расположенной по адресу
          https//productioncity.pro и регулирует сбор и использование файлов cookie при
          посещении Пользователями сайта.
          Настоящая Политика направлена на информирование Пользователей о том, какие
          данные собираются с помощью файлов cookie, с какой целью они используются, а
          так же о том, как Пользователь может управлять настройками файлов cookie.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            2.Что такое файлы cookie?
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          Файлы cookie- это не большие текстовые файлы, которые сохраняются на
          устройстве Пользователя при посещении веб-сайта. Они позволяют сайту
          распознавать браузер Пользователя и сохранять определенную информацию о
          предыдущих посещениях. для улучшения пользовательского опыта посетителей,
          а также для сохранения пользовательских предпочтений.
          Файлы cookie не содержат вредоносных программ и не могут нанести вред
          устройствам Пользователя.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            3. Какие типы файлов мы используем
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          На сайте Production City используются следующие типы файлов cookie:<br>
          3.1. Обязательные (необходимые) файлы cookie<br>
          - Необходимы для корректной работы сайта.<br>
          - Позволяют пользователю перемещаться по сайту и использовать его функции в
          полной мере.<br>
          - Без этих файлов cookie сайт не сможет предоставлять базовый функционал в
          полном объеме.<br>
          3.2. Функциональные файлы cookie<br>
          - Используются для запоминания выбора пользователя (например: язык, регион,
          имя пользователя).<br>
          - Улучшают удобство пользования сайтом.<br>
          3.3. Аналитические и статистические файлы cookie<br>
          - Собирают информацию об использовании сайта пользователями (например,
          какие страницы посещаются чаще всего).<br>
          - Используются для анализа эффективности работы сайта и улучшения
          пользовательского опыта.<br>
          - Используемые инструменты: Google Analytics, Яндекс.Метрика и другие
          подобные сервисы.<br>
          3.4. Рекламные файлы cookie<br>
          - Используются для показа релевантной рекламы.<br>
          - Позволяют ограничивать частоту показа объявлений и измерять эффективность
          рекламных компаний.<br>
          - Так же могут использоваться для таргетинга и персонализации рекламы.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            4. Управление файлами cookie
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          Пользователь может в любое время изменить настройки своего браузера, что бы
          блокировать или удалять файлы cookie:<br>
          - в браузере выберите «Настройки» или «Параметры»;<br>
          - перейдите в раздел конфиденциальности или безопасности;<br>
          - измените параметры обработки файлов cookie.<br>

          Так же на нашем сайте может быть установлен баннер с информацией о согласии
          на использование файлов cookie, который позволяет Пользователю принять или
          не принять определенную категорию файлов cookie.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            5. Передача данных третьим лицам
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          Мы можем использовать сторонние сервисы, такие как Google Analytics, Яндекс
          Метрика и другие, которые так же могут устанавливать свои файлы cookie. Эти
          компании могут собирать данные о Вашем поведении на сайте в целях аналитики
          и рекламы.
          Данные собираемые этими сервисами, регулируются их собственными
          политиками конфиденциальности. Мы рекомендуем ознакомиться с ними перед
          использованием нашего сайта.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            6. Изменения в политике
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          Мы оставляем за собой право вносить изменения в настоящую Политику
          использования файлов cookie. Все изменения вступают в силу с момента их
          публикации на сайте.
        </p>
        <p class="textMontserrat textMontserrat_medium">
          <b>
            7. Контакты
          </b>
        </p>
        <p class="textMontserrat textMontserrat_medium">
          По всем вопросам, связанным с использованием файлов cookie, Вы можете
          обращаться:<br>
          - Юридический адрес: 129128, Россия, г.Москва,
          проспект Мира, дом 188, пом.1, ком.1, офис 18<br>
          - Через форму обратной связи на сайте <a href="https://productioncity.pro">www.productioncity.pro</a><br>
          - По электронной почте: <a href="mailto:productioncity@rambler.ru">productioncity@rambler.ru</a> (предпочтительно)
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  max-width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: em(768, 16)) {
    max-width: 100%;
  }

  h2 {
    font-size: rem(36);
    margin-top: rem(40);
    margin-bottom: rem(20);
  }

  p {
    margin-bottom: rem(20);
    font-size: rem(18);
  }
}
</style>