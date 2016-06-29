import 'whatwg-fetch';

export default function getPosts(username, cb) {
  console.log(username);
  fetch(`https://medium.com/@${username}/latest?format=json`)
    .then((response) => {
      return response.text();
    }).then((text) => {
      text = text.replace('])}while(1);</x>', '');
      console.log(JSON.parse(text));
      return cb(JSON.parse(text));
    });
}