<script setup>
import {computed, ref} from "vue";
import {useMainStore} from "@/store/MainStore";

const mainStore = useMainStore();

const inputs = computed(() => mainStore.inputs);

const showPassword = ref('password');

const props = defineProps({
  inputType: {
    type:String,
    default(){
      return "text"
    }
  },
  placeholder: {
    type:String,
    default() {
      return ""
    }
  },
  inputMode: {
    type: String,
    default(){
      return "text"
    }
  },
  validateID: {
    type: String,
    default() {
      return ""
    }
  }
});

const inputValue = computed({
  get() {
    return inputs.value[props.validateID];
  },
  set(value) {
    mainStore.setInputs(props.validateID, value);
  }
});

const setShowPassword = () => {
  if (showPassword.value === 'password') {
    showPassword.value = 'text'
  } else if (showPassword.value === 'text') {
    showPassword.value = 'password'
  }
}

const setShowPasswordDefault = () => {
  showPassword.value = 'password'
}
</script>

<template>
    <div
        class="inputBorder"
        tabindex="1"
        @blur="setShowPasswordDefault"
    >
      <input
          class="border_subBg textMontserrat"
          :type="props.inputType === 'password' ? showPassword : props.inputType"
          :placeholder="props.placeholder"
          :inputmode="props.inputMode"
          v-model="inputValue"
      />
      <svg
          v-if="props.inputType === 'password'"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          @click="setShowPassword"
      >
        <title>Iconly/Broken/Show</title>
        <g id="Iconly/Broken/Show" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Show" transform="translate(2.000000, 4.000000)" fill="#000000" fill-rule="nonzero">
            <path d="M10.002125,2.04281037e-13 C14.1380733,0.00198782457 17.8530268,2.88632128 19.9400007,7.71375326 C20.0199998,7.89663312 20.0199998,8.10336688 19.9400007,8.28724065 C19.6920038,8.86072804 19.4160073,9.41831283 19.118011,9.9411107 C18.9190135,10.2929556 18.4750191,10.4152069 18.1210235,10.2184122 C17.7690279,10.0196298 17.6450294,9.5773388 17.843027,9.22748167 C18.0650242,8.83687415 18.2750216,8.42440055 18.4680191,8 C16.6010425,3.89613617 13.4530818,1.4560815 10.000125,1.45508759 C6.54616817,1.4560815 3.39820752,3.89613617 1.53123086,8 C3.39820752,12.1038638 6.54616817,14.5449124 10.000125,14.5449124 C12.0080999,14.5449124 13.9450757,13.7140017 15.602055,12.1406386 C15.8950513,11.8653249 16.3570455,11.875264 16.636042,12.1654864 C16.9160385,12.4547149 16.9040387,12.9148963 16.6120423,13.1921978 C14.6790665,15.0279538 12.3940951,15.9990061 10.002125,16 L10.002125,16 C5.86217672,15.9980122 2.14722316,13.1146726 0.0592492594,8.28724065 C-0.0197497531,8.10436079 -0.0197497531,7.89663312 0.0592492594,7.71375326 C2.14722316,2.88632128 5.86217672,0.00198782457 9.99712504,2.04281037e-13 L9.99712504,2.04281037e-13 Z M9.999625,4.12433843 C12.1495981,4.12433843 13.8985763,5.86269102 13.8985763,7.99960244 C13.8985763,10.1375078 12.1495981,11.8758604 9.999625,11.8758604 C9.29163385,11.8758604 8.59864252,11.6850292 7.99565005,11.324239 C7.64865439,11.1184992 7.53665579,10.6712387 7.74565318,10.3263511 C7.95365058,9.98345136 8.40364495,9.86915145 8.74864064,10.0788669 C9.12463594,10.3034911 9.55763053,10.4217667 9.999625,10.4217667 C11.3426082,10.4217667 12.4355946,9.33542055 12.4355946,7.99960244 C12.4355946,6.66577215 11.3426082,5.57942602 9.999625,5.57942602 C8.65664179,5.57942602 7.56365545,6.66577215 7.56365545,7.99960244 C7.56365545,8.40213691 7.23565955,8.72714623 6.8316646,8.72714623 C6.42766965,8.72714623 6.10067374,8.40213691 6.10067374,7.99960244 C6.10067374,5.86269102 7.84965188,4.12433843 9.999625,4.12433843 Z"></path>
          </g>
        </g>
      </svg>
    </div>
</template>

<style scoped lang="scss">
.inputBorder{
  position:relative;
  svg {
    position: absolute;
    right: rem(10);
    top: rem(6);
    cursor: pointer;
  }
}
input{
  width: 100%;
  border-radius: 5px;
  padding: rem(8) rem(20);
}

</style>