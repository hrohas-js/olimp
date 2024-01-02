<script setup>
import OnOfComponent from "@/components/UI/OnOfComponent";
</script>

<template>
  <section class="settingsTab profileTab">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Настройки
      </h2>
    </header>
    <main class="settingsTab__main">
      <ul>
        <li>
          <p class="textMontserrat_regular">
            настройка 1
          </p>
          <on-of-component/>
        </li>
        <li>
          <p class="textMontserrat_regular">
            настройка 2
          </p>
          <on-of-component/>
        </li>
        <li>
          <p class="textMontserrat_regular">
            настройка 3
          </p>
          <on-of-component/>
        </li>
      </ul>
    </main>
  </section>
</template>

<style scoped lang="scss">
.settingsTab {
  &__main {
    margin-top: rem(20);

    ul {
      li {
        margin-top: rem(10);
        display: grid;
        grid-template-columns: minmax(150px, 250px) 0.5fr;

        &:first-child {
          margin-top: 0;
        }

        .onOf {
          max-width: rem(60);
        }
      }
    }
  }
}
</style>