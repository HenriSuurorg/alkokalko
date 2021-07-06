export const typeInitalValues = (type: string) => {
  let volume = '';
  let abv = '';
  if (type === 'large-beer') {
    volume = '500';
    abv = '4.8';
  } else if (type === 'small-beer') {
    volume = '330';
    abv = '4.8';
  } else if (type === 'glass-wine') {
    volume = '150';
    abv = '13';
  } else if (type === 'shot-vodka') {
    volume = '40';
    abv = '40';
  } else if (type === 'gin') {
    volume = '50';
    abv = '40';
  } else if (type === 'cognac') {
    volume = '50';
    abv = '40';
  } else if (type === 'whisky') {
    volume = '100';
    abv = '40';
  } else if (
    type === 'gin-tonic' ||
    type === 'mojito' ||
    type === 'bloody-mary'
  ) {
    volume = '300';
    abv = '15';
  } else if (type === 'white-russian') {
    volume = '100';
    abv = '25';
  } else if (type === 'martini') {
    volume = '100';
    abv = '33';
  } else if (type === 'coctail') {
    volume = '300';
    abv = '15';
  }
  return { type: type, volume: volume, unit: 'ml', abv: abv, timePassed: '' };
};
