/**
 * Author: luisliu
 * Description: 
 * Time: 2022-06-02 15:28:44
 * Contact: lc63msn@Hotmail.com
 */
<style>

</style>

<template>
<div class="flex-row" :class="`back-${i}`" v-for="i of 9" :key="i">
  <div :class="`color-${j}`" v-for="j of 9" :key="j + '_'">
    {{ `back-${i}` }} <br/> {{  `color-${j}` }}
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: '',
  props: {},
  setup(props) {

  }
})
</script>
