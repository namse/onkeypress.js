<template>
  <div class="conatiner">
    <div
      class="key-container"
      v-for="keyInfo in keyboardLayout"
      :key="keyInfo.scanCode"
      v-bind:style="{
        left: keyInfo.x * keyWidth  + 'px',
        top: keyInfo.y * keyWidth  + 'px',
      }"
    >
      <Key :keyInfo="keyInfo" :size="keyInfo.size" :pressed="keyPressingMap[keyInfo.scanCode]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { KeyInfo } from '../KeyInfo';
import Key from './Key.vue';
import { keyboardLayout } from '../keyboardLayout';

@Component({
  components: {
    Key,
  },
})
export default class KeyboardView extends Vue {
  @Prop() keyPressingMap!: { [scanCode: number]: boolean };
  readonly maxKeys = 10;
  readonly keyWidth = 40;
  private keyboardLayout = keyboardLayout;
}
</script>

<style scoped>
.conatiner {
  position: relative;
}
.key-container {
  display: inline-block;
  position: absolute;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active {
  transition: all 0.2s;
}

.list-leave-active {
  transition: all 0s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
