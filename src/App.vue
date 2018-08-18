<template>
  <div id="app">
    <SequenceView :keyInfoList="keyInfoList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SequenceView from './components/SequenceView.vue';
import SCAN_CODE from '@/scanCode';
import { KeyInfo } from './KeyInfo';

declare var ioHook: any;

@Component({
  components: {
    SequenceView,
  },
})
export default class App extends Vue {
  keyInfoList: KeyInfo[] = [];

  mounted() {
    this.keyInfoList = [];
    ioHook.on('keydown', (event: ioHookEvent) => {
      console.log(event);
      const keyInfo: KeyInfo = {
        scanCode: event.keycode,
        display: SCAN_CODE[event.keycode],
      };
      this.keyInfoList.push(keyInfo);
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
