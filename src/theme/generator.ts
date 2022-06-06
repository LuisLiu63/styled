/**
 * Author: luisliu
 * Description: 颜色生成模块
 * Time: 2022-05-26 19:29:59
 * Contact: lc63msn@Hotmail.com
 */

import chroma from 'chroma-js';
import _range from 'lodash/range';
import { LEVEL, PREFIX } from '../constants/index';
import { Convert } from '../utils/index'


interface StateType {
    hover: any;
    focus: any;
    active: any;
    gradient?: any;
}

interface StyleType {
    hover: any,
    focus: any,
    active: any,
    gradient?: any,
    [key: string]: any
}

type VarsType = {
    background: StyleType,
    color: StyleType,
    border: StyleType,
    shadow: StyleType,
    state?: StyleType
}

type OpitonType = {
    colors: string,
    levels: number,
    vars: VarsType
}

type OpitonParamType = {
    colors: string,
    levels: number,
    levelMap?: {

    },
    vars?: VarsType
}

type CssVarsOption = {
    target: string | HTMLElement,
    prefix: string
}

interface StyleInterface {
    _initoption: OpitonType,
    _instance?: any
}

function checkLevel(level) {
    return level >= 3 && (level % 2) !== 0
}

const defaultOption: OpitonType = {
    colors: '#000000',
    levels: LEVEL,
    vars: generateVars('#ffffff', LEVEL)
}

const cssVarsOption: CssVarsOption = {
    target: document.body,
    prefix: PREFIX
}

function makeOption(option: OpitonParamType): OpitonType {
    return Object.assign({}, defaultOption, option)
}

function makeColorMap(colors) {
    let group:StyleType = {
        hover: {},
        focus: {},
        active: {},
    }
    colors.forEach((color, index) => {
        const key = index + 1
        group[key] = Convert.to(color, 'var')
        group.hover[key] = Convert.light(color, 1.05, 'var')
        group.focus[key] = Convert.light(color, 1.1, 'var')
        group.active[key] = Convert.light(color, 1.15, 'var')
    })
    return group
}


export function generateVars(color: string, level: number): VarsType {
    const allColors = generateGradient(color, level * 2)
    const backgrounds = allColors.slice(0, level)
    const colors = allColors.slice(level, allColors.length - 1)

    return {
        background: makeColorMap(backgrounds),
        color: makeColorMap(colors),
        border: makeColorMap(Convert.darkArray(backgrounds, 0.95, 'keep')),
        shadow: makeColorMap(Convert.darkArray(backgrounds, 0.8, 'keep')),
    }
}

export class Styled implements StyleInterface {
    _initoption
    option
    constructor(options) {
        // for reset
        this._initoption = options;
        this.option = makeOption(options)
        this.setCssVars(this.option.vars, cssVarsOption)
    }

    setCssVars(vars: VarsType, option: CssVarsOption) {
        const rootElement = document.body.style;

        (function loop (obj: any, name:string) {
            for (const key in obj) {
            const _path = `${name}-${key}`;

            typeof obj[key] === 'string'
                ? rootElement.setProperty(_path, obj[key])
                : loop(obj[key], _path)
            }
        })(vars, option.prefix)
    }
}











export function generate(color, options:OpitonParamType = defaultOption) {
    if(checkLevel(options.levels)) throw new Error(`leve must be an odd number, default level is: ${defaultOption.levels}`);
    const total = options.levels * 2;

    const allColors = generateGradient(color, total)
    
    const backgrounds = getBackground(allColors)
    const colors = []
    return allColors
}

function getBackground (allColor) {

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