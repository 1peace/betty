import getJSON from './getJSON';

getJSON('data.json', data => {
  console.log('\'Allo \'Allo!');

  console.log(data);
});
