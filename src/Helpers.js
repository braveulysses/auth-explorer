import URI from 'urijs';

export function guid() {
  // See: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16|0, v = c === 'x' ? r : ((r&0x3)|0x8);
    return v.toString(16);
  });
}

export function parseParamsFromUrl(url) {
  let uri = URI(url);
  let params = {};
  if (uri.query()) {
    params = parseParams(uri.search());
  }
  if (uri.hash()) {
    params = parseParams(uri.hash());
  }
  return params;
}

function parseParams(raw_params) {
  // See: https://developers.google.com/accounts/docs/OAuth2UserAgent
  let params = {};
  const rx = /([^&=]+)=([^&]*)/g;
  const query_string = raw_params.substring(1);
  let match = rx.exec(query_string);
  while (match) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    match = rx.exec(query_string);
  }
  return params;
}