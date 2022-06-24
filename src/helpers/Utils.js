export function kFormatter(num) {
    console.log(num)
    console.log(Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) : Math.sign(num)*Math.abs(num))
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) : Math.sign(num)*Math.abs(num)
}


// to transform numbers from 645200 to 645.2 to be displayed 645.2 K in the chart