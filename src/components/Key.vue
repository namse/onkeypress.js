<template>
  <div class="container">
    {{keyInfo.display}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeyInfo } from '../KeyInfo';

@Component
export default class Key extends Vue {
    @Prop() private keyInfo!: KeyInfo;
}
</script>

<style scoped>
.container {
  width: 30px;
  height: 30px;
  border: 2px outset black;
  border-radius: 5px;
}
</style>
