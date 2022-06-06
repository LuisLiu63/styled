/**
 * Author: luisliu
 * Description: convert values
 * Time: 2022-05-31 20:34:51
 * Contact: lc63msn@Hotmail.com
 */
import chroma from 'chroma-js';

const customFormater = {
  var: toVar,
}

function toVar(v: any) {return chroma(v).rgb().toString()}

export function to(color: any, format: string): any {
  if (format === 'keep') {
    return color
  } else {
    return (color[format] ? color[format]() : (customFormater[format] ? customFormater[format](color) : color))
  }
}

export function light(color:any, step:number, output:string = 'rgb') {
  const value = color.brighten(step)
  return to(value, output)
}

export function lightArray(colors:any, step:number, output:string = 'rgb') {
  return colors.map(color => light(color, step, output))
}

export function dark(color:any, step:number, output:string = 'rgb') {
  const value = color.darken(step)
  return to(value, output)
}

export function darkArray(colors:any, step:number, output:string = 'rgb') {
  return colors.map(color => dark(color, step, output))
}