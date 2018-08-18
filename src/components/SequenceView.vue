<template>
  <div class="conatiner">
    <Key v-for="(keyInfo, index) in keyInfoList" :key="index" :keyInfo="keyInfo" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeyInfo } from '../KeyInfo';
import Key from './Key.vue';

@Component({
  components: {
    Key,
  },
})
export default class SequenceView extends Vue {
  @Prop() private keyInfoList!: KeyInfo[];
}
</script>

<style scoped>
.conatiner {
  display: flex;
}
</style>
