/**
 * Author: luisliu
 * Description: 
 * Time: 2022-05-26 20:22:41
 * Contact: lc63msn@Hotmail.com
 */
<style>
.root-layout {
  height: 100%;
  overflow: hidden;
}
</style>

<template>
<div class="root-layout">
  <!-- <slot></slot> -->
  <router-view></router-view>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RootLayout',
  props: {},
  setup(props) {
    const style = ref({
      height: `${window.innerHeight}px`
    })
    return {
      style
    }
  }
})
</script>
