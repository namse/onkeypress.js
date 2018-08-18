<template>
  <div id="app">
    <SequenceView :keyInfoSequence="keyInfoSequence"/>
    <KeyboardView :keyPressingMap="keyPressingMap"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SequenceView from './components/SequenceView.vue';
import SCAN_CODE from '@/scanCode';
import { KeyInfoWithSequence } from './KeyInfo';
import KeyboardView from './components/KeyboardView.vue';


declare var ioHook: any;

const ioHookDifferntKeyMap = {
  // iohook keycode : scancode
  3639: 55,
}

@Component({
  components: {
    SequenceView,
    KeyboardView,
  },
})
export default class App extends Vue {
  keyInfoSequence: KeyInfoWithSequence[] = [];
  keyPressingMap: { [keycode: number]: boolean } = {};
  readonly keyInfoDeleteLifeTime = 2000; // ms

  mounted() {
    this.keyInfoSequence = [];
    ioHook.on('keydown', (event: ioHookEvent) => {
      const isKeyPressing = this.keyPressingMap[event.keycode];
      if (!isKeyPressing) {
        const lastKeyInfo = this.keyInfoSequence[this.keyInfoSequence.length - 1];
        const sequence = lastKeyInfo ? lastKeyInfo.sequence + 1 : 0;
        const keyInfo: KeyInfoWithSequence = {
          scanCode: event.keycode,
          display: SCAN_CODE[event.keycode],
          sequence,
        };
        this.keyInfoSequence.push(keyInfo);

        setTimeout(() => {
          this.keyInfoSequence.shift();
        }, this.keyInfoDeleteLifeTime);
      }

      this.keyPressingMap = {
        ...this.keyPressingMap,
        [event.keycode]: true,
      };
    });

    ioHook.on('keyup', (event: ioHookEvent) => {
      this.keyPressingMap = {
        ...this.keyPressingMap,
        [event.keycode]: false,
      };
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
