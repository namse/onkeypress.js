<template>
  <div
    class="container"
    :class="{ pressed }"
    :style="{ width: (size * keyWidth) - (margin * 2) + 'px', }"
  >
    {{keyInfo.display}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeyInfo } from '../KeyInfo';

@Component
export default class Key extends Vue {
    @Prop() private keyInfo!: KeyInfo;
    @Prop({ default: 1 }) private size!: number;
    @Prop({ default: false }) private pressed!: boolean;
    private readonly keyWidth = 40;
    private readonly margin = 5;
}
</script>

<style scoped>
.container {
  height: 30px;
  border: 2px outset black;
  border-radius: 5px;
  margin: 5px;
}
.pressed {
  background-color: red;
}
</style>
