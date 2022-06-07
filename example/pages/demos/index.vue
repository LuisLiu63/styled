/**
 * Author: luisliu
 * Description: 
 * Time: 2022-06-02 15:28:44
 * Contact: lc63msn@Hotmail.com
 */
<style lang="scss">
header {
  padding: 15px;
  font-size: 18px;
}
.title {
  padding: 5px;
  border-bottom: 5px solid rgb(var(--any-border-5))
}

.button {
  display: inline-block;
  padding: 5px 10px;
  margin: 3px;
  border-width: 2px;
  border-style: solid;
}
</style>

<template>
  <themeBar />
  <header class="back-5 color-5">
    网站标题
  </header>
  <br>
  <div class="flex-row h-5v6">
    <nav class="w-1v4 back-6 color-6" style="margin-right: 20px;">
      <div class="title">
        导航栏
      </div>
      <br>
      <div class="button" v-for="i of 9" :key="i" :class="[`border-${i}`, `back-${i}`, `color-${i}`, ]">按钮{{i}}</div>
    </nav>
    <main class="w-full back-7 color-6">
      主要内容区
    </main>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue';
import themeBar from '@example/components/themeBar/index.vue';

export default defineComponent({
  name: '',
  components: {
    themeBar
  },
  props: {},
  setup(props) {

  }
})
</script>
