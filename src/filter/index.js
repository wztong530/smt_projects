//过滤数字格式，如100000->10万 100000000->1亿
let numFormat = value => {
  let k = 10000, sizes = ['', '万', '亿', '万亿'], i, newValue, unit;
  if (value < k) { //小于1万
    newValue = value;
    unit = '';
  } else { //大于等于1万
    i = Math.floor(Math.log(value) / Math.log(k));//返回以k为底 value的对数 的向下取整整数
    newValue = (value / k ** i).toFixed(1);
    unit = sizes[i];
  }
  return newValue + unit;
}

export { numFormat }
