/**
 * Author: luisliu
 * Description: 
 * Time: 2022-05-26 19:43:14
 * Contact: lc63msn@Hotmail.com
 */
<style lang="scss">
.theme-test-page {
  height: 100%;
  background-color: rgb(var(--color-0));

  header {
    height: 60px;
    margin: 0 10px 0 10px;
    background-color: rgb(var(--color-1));
    color: rgb(var(--color-8));
  }

  .theme-test-page-content {
    display: flex;
    height: calc(100% - 90px);
    overflow-y: auto;
    > div {
      margin: 10px;
    }
  }

  .page-nav {
    width: 300px;
    height: 100%;
    background-color: rgb(var(--color-1));
    color: rgb(var(--color-9));
  }

  .page-content {
    height: 100%;
    background-color: rgb(var(--color-2));
    color: rgb(var(--color-9));
  }

  .sub-title {
    color: rgb(var(--color-8));
  }
}


.color-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px dashed rgba(var(--color-8), 0.5);
  > div, > input {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;
    line-height: 50px;
    text-align: center;
  }
}

.themed-card {
  padding: 20px 0px;
}
</style>

<template>
<div class="theme-test-page" ref="eleRef">

  <header>
    <h1>网站首页</h1>
  </header>

  <div class="theme-test-page-content">

    <div class="page-nav">
      <h1>网站导航栏</h1>
      <ul>
        <li>电磁模型库</li>
        <li>平台模型库</li>
        <li>装备模型库</li>
        <li>情报信息系统</li>
      </ul>
      <div class="themed-card" v-for="(color, index) of result.filter((item, i) => i <5)" :key="color">
        {{ color }}
        <div class="color-bar" :style="{'background-color': `rgb(${color})`}">
          <span v-for="(color, index) of result.filter((item, i) => i > 4)" :key="color" :style="{'color': `rgb(${result[result.length - (index + 1)]})`}">
            {{ color }}
          </span>
        </div>
      </div>
    </div>

    <div class="page-content">
      <h1>网站内容区</h1>
      <p class="sub-title">网站内容区副标题，用于对标题的描述文字描述文字描述文字描述文字</p>
      <div>
        <label for="">
          主题色切换: 
          <select v-model="colorPicker">
            <option :value="color" v-for="color of colorOption" :key="color">
              {{ color }}
            </option>
          </select>
        </label>
        <label for="">
          自定义颜色: 
          <input type="color"  v-model="colorPicker" name="" id="">
        </label>
        <label for="">
          颜色反转:
          <input v-model="isRevert" type="checkbox" name="" id="" @change="reverseColors">
        </label>
        <button type="button" @click="reset">重置</button>
      </div>
      色卡：
      <div class="color-bar">
        <!-- <div v-for="(color, index) of result" :key="color" :style="{'background-color': color, 'color': result[result.length - (index + 1)]}">
        </div> -->
        <input v-for="(color, index) of result" :key="color" type="color" :value="`rgb(${color})`" @change="setBarColor(index, $event)">
      </div>
      背景色卡范围：
      <div class="color-bar">
        <div v-for="(color, index) of result.filter((item, i) => i <5)" :key="color" :style="{'background-color': `rgb(${color})`, 'color': `rgb(${result[result.length - (index + 1)]})`}">
        </div>
        <!-- <input v-for="(color, index) of result.filter((item, i) => i <5)" :key="color" type="color" :value="`rgb(${color})`" @change="setBarColor(index, $event)"> -->
      </div>
      前景色卡范围：
      <div class="color-bar">
        <div v-for="(color, index) of result.filter((item, i) => i > 4)" :key="color" :style="{'background-color': `rgb(${color})`, 'color': `rgb(${result[result.length - (index + 1)]})`}">
        </div>
        <!-- <input v-for="(color, index) of result.filter((item, i) => i >4)" :key="color" type="color" :value="`rgb(${color})`" @change="setBarColor(index + 4, $event)"> -->
      </div>
      背景-文字对比：
      <div v-for="(color, index) of result.filter((item, i) => i <5)" :key="color">
        {{ color }}
        <div class="color-bar" :style="{'background-color': `rgb(${color})`}">
          <span v-for="(color, index) of result.filter((item, i) => i > 4)" :key="color" :style="{'color': `--color-${result[result.length - (index + 1)]}`}">
            {{ color }}
          </span>
        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import chroma from 'chroma-js';
import _range from 'lodash/range';

import { generate, generateVars } from '@/theme/generator'

console.log(generateVars('#fff', 9))

function autoGradient(color, numColors, diverging=false) {
  const lab = chroma(color).lab();
  const lRange = 100 * (0.95 - 1/numColors);
  const lStep = lRange / (numColors-1);
  let lStart = (100-lRange)*0.5;
  const range = _range(lStart, lStart+numColors*lStep, lStep);
  let offset = 0;
  if (!diverging) {
      offset = 9999;
      for (let i=0; i < numColors; i++) {
          let diff = lab[0] - range[i];
          if (Math.abs(diff) < Math.abs(offset)) {
              offset = diff;
          }
      }
  }
  return range.map(l => chroma.lab([l + offset, lab[1], lab[2]]));
}

function autoColors(color, numColors, diverging=false) {
  if (diverging) {
      const colors = autoGradient(color, 3).concat(chroma('#f5f5f5'));
      return colors;
  } else {
      return autoGradient(color, numColors, diverging);
  }
}


function getThemeColors(colors) {
  const diverging = false;
  const correctLightness = true;
  const bezier = true;
  const numColors = 10;

  const even = numColors % 2 === 0;
  const numColorsLeft = diverging ? Math.ceil(numColors/2) + (even?1:0) : numColors;
  const numColorsRight = diverging ? Math.ceil(numColors/2) + (even?1:0) : 0;

  const genColors = colors.length !== 1 ? colors : autoColors(colors[0], numColors, diverging)
  const _result = chroma.scale(bezier && genColors.length>1 ? chroma.bezier(genColors) : genColors)
    .correctLightness(correctLightness)
    .colors(numColorsLeft, 'rgb').map(item => item.join(','))
  return _result
}

function updateVars(target, vars) {
  vars.forEach((color, i) => {
    target.style.setProperty(`--color-${i}`, color)
  })
}

const colorOption = [
  '#67f2f5',
  '#0351a7',
  '#FFFFFF,#000000',
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
  '#0066CC,#CCFF66',
]

export default defineComponent({
  name: 'Colors',
  props: {},
  setup(props) {
    const eleRef = ref(null);

    const colorPicker = ref(colorOption[0])

    const isRevert = ref(false)
    
    const result = ref(getThemeColors(colorOption[0].split(',')));

    watch(() => colorPicker.value, (v) => {
      result.value = getThemeColors(v.split(','))
    })

    watch(() => result.value, (v) => {
      updateVars(eleRef.value, v)
    }, {
      deep: true
    })


    onMounted(() => {
      updateVars(eleRef.value, result.value)
    })

    function reverseColors() {
      result.value = result.value.reverse()
    }

    function setBarColor(index, v) {
      result.value[index] = v.target.value
      result.value = result.value
    }

    function reset() {
      result.value = getThemeColors(colorPicker.value.split(','))
    }
    
    return {
      result,
      eleRef,
      colorPicker,
      colorOption,
      isRevert,
      reverseColors,
      setBarColor,
      reset
    }
  }
})
</script>
