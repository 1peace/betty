const OK = 200;

function get(url) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (xhr.status === OK) {
        // Resolve the promise with the response text
        resolve(xhr.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(xhr.statusText));
      }
    };

    // Handle network errors
    xhr.onerror = () => {
      reject(Error('Network Error'));
    };

    // Make the request
    xhr.send();
  });
}

function getJSON(url, callback) {
  if (typeof fetch === 'undefined') { // xhr
    // console.warn('Not supported');

    if (typeof Promise === 'undefined') {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status === OK) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    } else {
      get(url).then(JSON.parse).then(response => {
        callback(response);
      }, error => {
        console.error('Failed', error);
      });
    }
  } else { // fetch
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        // console.info('parsed json', json);
        callback(json);
      }).catch(ex => {
        console.error('parsing failed', ex);
      });
  }
}

export default getJSON;
