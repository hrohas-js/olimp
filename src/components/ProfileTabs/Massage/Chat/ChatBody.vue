<script setup>
import ActionButton from "@/components/UI/Button/ActionButton";
</script>

<template>
  <div class="chatBody textMontserrat">
    <header class="chatBody__header">
      <div class="goodsInfo">
        <div class="goBeak">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path
                d="M0.939339 10.9393C0.353552 11.5251 0.353552 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM32 10.5L2 10.5V13.5L32 13.5V10.5Z"
                fill="black"/>
          </svg>
        </div>
        <div class="goods">
          <div class="avatar">
            <img src="@/assets/png/Profile/avatar.jpg" alt="altText"/>
          </div>
          <div class="image">
            <img src="@/assets/png/MyAnnouncements/cinema.png" alt="altText"/>
          </div>
          <div class="text">
            <h3 class="textMontserrat_medium">
              Анжелика
            </h3>
            <p class="textMontserrat_medium">
              Аренда проф. аппарата, 1000 руб/час
            </p>
          </div>
        </div>
      </div>
      <div class="actions">
        <action-button text="Показать телефон"/>
        <div class="activeMenu border_subBg">
          ...
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.chatBody {
  padding-top: rem(20);

  &__header {
    display: flex;
    gap: rem(70);

    .goodsInfo {
      display: flex;
      align-items: center;
      gap: rem(30);
    }

    .goods {
      position: relative;
      padding: rem(20) 0 0 rem(20);
      display: flex;
      align-items: center;
      gap: 1rem;
      .text{
        h3{
          font-size: rem(24);
        }
        p{
          margin-top: rem(10);
          font-size: rem(20);
        }
      }


      .avatar {
        position: absolute;
        top: 0;
        left: 0;
        max-width: rem(50);
        border-radius: 50%;
        border: 4px solid $color_bgLight;

        img {
          border-radius: 50%;
        }
      }


    }

    .actions {
      display: flex;
      gap: rem(40);
    }
  }

  .activeMenu {
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(60);
    height: rem(40);
  }
}
</style>