function assembleDate(date) {
  let _date = new Date(date);
  return _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日";
}

function formatPrice(price) {
  let _f = price/100;
  let _s = _f.toString();
  let pos_decimal = _s.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = _s.length;
    _s += '.';
  }
  while (_s.length <= pos_decimal + 2)
  {
    _s += '0';
  }
  return _s;
}

export default {
  install: function (Vue) {
    Vue.prototype.assembleDate = (param) => assembleDate(param);
    Vue.prototype.formatPrice = (param) => formatPrice(param);
  }
}
