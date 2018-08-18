<template>
  <div class="conatiner">
    <transition-group name="list" tag="p">
      <div
        class="key-container"
        v-for="(keyInfo, index) in keyInfoSequence"
        v-if="index >= keyInfoSequence.length - maxKeys"
        :key="keyInfo.sequence"
        v-bind:style="{ left: (keyInfo.sequence % maxKeys) * keyWidth  + 'px' }"
      >
        <Key :keyInfo="keyInfo" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeyInfoWithSequence } from '../KeyInfo';
import Key from './Key.vue';

@Component({
  components: {
    Key,
  },
})
export default class SequenceView extends Vue {
  @Prop() private keyInfoSequence!: KeyInfoWithSequence[];
  readonly maxKeys = 10;
  readonly keyWidth = 40;
}
</script>

<style scoped>
.conatiner {
  height: 60px;
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
