/**
 * Author: luisliu
 * Description: 颜色生成模块
 * Time: 2022-05-26 19:29:59
 * Contact: lc63msn@Hotmail.com
 */

import chroma from 'chroma-js';
import _range from 'lodash/range';

export function generate(color, level) {
    const total = level * 2;
    const backgrounds = []
    const colors = []

    const allColors = generateGradient(color, total)
    return allColors
}

function generateGradient(color, numColors, diverging=false) {
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
        const colors = generateGradient(color, 3).concat(chroma('#f5f5f5'));
        return colors;
    } else {
        return generateGradient(color, numColors, diverging);
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
  
    return chroma.scale(bezier && genColors.length>1 ? chroma.bezier(genColors) : genColors)
      .correctLightness(correctLightness)
      .colors(numColorsLeft)
  }