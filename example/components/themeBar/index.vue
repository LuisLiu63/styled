/**
 * Author: luisliu
 * Description: 
 * Time: 2022-06-02 17:25:38
 * Contact: lc63msn@Hotmail.com
 */
<style lang="scss">
.color-bar {
  padding: 10px;
  font-size: 20px;

  > div {
    padding: 5px;
    margin: 5px;
  }
}
</style>

<template>
<div class="fixed top-right h-full color-9">
  <label for="">
    隐藏工具栏：
    <input type="checkbox" v-model="hideBar">
  </label>
  <div class="h-full back-5 color-5" :class="{hide: hideBar}">
    <div class="inline-block w-1v3">
      主题色切换: 
      <select v-model="colorValue">
        <option :value="color" v-for="color of colorOption" :key="color">
          {{ color }}
        </option>
      </select>
    </div>
    <div class="inline-block w-1v3">
      自定义颜色: 
      <input type="color" v-model="colorValue" name="" id="">
    </div>
    <div class="inline-block w-1v3">
      颜色反转: 
      <input type="checkbox" v-model="reverse" name="" id="">
    </div>
    <div class="h-3v4 overflow-y-auto">
      预览: 
      <div v-for="i of 9" :key="i">
        {{ `back-${i}` }}
        <div class="flex-row color-bar" :class="`back-${i}`">
          <div :class="`color-${j}`" v-for="j of 9" :key="j + '_'" :style="{border: `1px solid rgb(var(--any-border-${j}))`}">
            {{  `color-${j}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { generateVars } from '@/index';
import StyledVars from '@example/style/index';

const colorOption = [
  '#67f2f5',
  '#0351a7',
  '#293232',
  '#206edd',
  '#FFFFCC',
  '#663366',
  '#CCFFFF',
  '#FFCCCC',
  '#99CCCC',
  '#FFCC99',
  '#0099CC',
  '#003366',
  '#0066CC',
  '#003399',
  '#FF9900',
  '#FF6600',
  '#990033',
  '#CCFF66',
  '#FF9900',
]

export default defineComponent({
  name: '',
  props: {},
  setup(props) {

    const colorValue = ref(colorOption[0])
    const reverse = ref(false)
    const hideBar = ref(false)

    function updateTheme() {
      const _theme = generateVars(colorValue.value, 9, reverse.value)
      StyledVars.setCssVars(_theme)
    }

    watch(() => colorValue.value, (v) => {
      updateTheme()
    }, {
      immediate: true
    })

    watch(() => reverse.value, (v) => {
      updateTheme()
    }, {
      immediate: true
    })

    return {
      colorValue,
      colorOption,
      reverse,
      hideBar
    }
  }
})
</script>
