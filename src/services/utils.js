var Utils = {};

export function num2numDong(num, currency, currencyLabel) {
  /**
   * Tự động phân cách 3 số sau dấu phẩy
   */
  if (isNaN(num)) {
    num = 0;
  }
  let positive_num = Math.abs(num);
  let num_string = '';

  let cumulative_revenue = Array.from(
    parseFloat(positive_num).toFixed(0),
  ).reverse();
  let beauti_cumulative_revenue = '';
  cumulative_revenue.forEach((number, index) => {
    beauti_cumulative_revenue += number;

    if (index && !((index + 1) % 3)) {
      beauti_cumulative_revenue += ',';
    }
  });
  beauti_cumulative_revenue = beauti_cumulative_revenue.replace(/[,]$/, '');
  num_string = Array.from(beauti_cumulative_revenue).reverse().join('');
  if (currency !== false) {
    num_string += currencyLabel ? ' ' + currencyLabel : ' đ';
  }
  if (num !== 0 && num < 0) {
    return '-' + num_string;
  }
  return num_string;
}

export const formatDate = (data = '    ') => {
  const myArray = data?.split(' ');
  const day = myArray[0].split(/\D/g).reverse().join('/');
  return day + ' ' + myArray[1].slice(0, 5);
};

Utils.num2numDong = num2numDong;
Utils.formatDate = formatDate;

export default Utils;
