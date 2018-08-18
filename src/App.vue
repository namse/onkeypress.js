<template>
  <div id="app">
    <SequenceView :keyInfoList="keyInfoList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SequenceView from './components/SequenceView.vue';
import SCAN_CODE from '@/scanCode';
import { KeyInfoWithSequence } from './KeyInfo';

declare var ioHook: any;

@Component({
  components: {
    SequenceView,
  },
})
export default class App extends Vue {
  keyInfoList: KeyInfoWithSequence[] = [];
  keyPressingMap: { [keycode: number]: boolean } = {};
  readonly keyInfoDeleteLifeTime = 2000; // ms

  mounted() {
    this.keyInfoList = [];
    ioHook.on('keydown', (event: ioHookEvent) => {
      const isKeyPressing = this.keyPressingMap[event.keycode];
      if (!isKeyPressing) {
        const lastKeyInfo = this.keyInfoList[this.keyInfoList.length - 1];
        const sequence = lastKeyInfo ? lastKeyInfo.sequence + 1 : 0;
        const keyInfo: KeyInfoWithSequence = {
          scanCode: event.keycode,
          display: SCAN_CODE[event.keycode],
          sequence,
        };
        this.keyInfoList.push(keyInfo);

        setTimeout(() => {
          this.keyInfoList.shift();
        }, this.keyInfoDeleteLifeTime);
      }

      this.keyPressingMap[event.keycode] = true;
    });

    ioHook.on('keyup', (event: ioHookEvent) => {
      this.keyPressingMap[event.keycode] = false;
    });

    ioHook.start();
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
