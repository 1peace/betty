function getJSON(url, callback) {
  if (typeof fetch === 'undefined') { // xhr
    console.warn('Not supported');

    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      callback(JSON.parse(xhr.responseText));
    };
    xhr.open('GET', url, true);
    xhr.send();
  } else { // fetch
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        console.info('parsed json', json);
        callback(json);
      }).catch(ex => {
        console.error('parsing failed', ex);
      });
  }
}

export default getJSON;
