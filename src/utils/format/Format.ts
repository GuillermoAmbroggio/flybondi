export const capitalizeFirstLetter: (str: string) => string = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function priceFormat(number: number): string {
  const num = Math.round(number * 1e12) / 1e12;
  const parts = num.toString().split(',');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$ ${parts.join(',')}`;
}
