const {BrowserWindow} = require('electron').remote
const medium = require('medium-sdk');
import * as UserActions from '../actions/user';
import fs from 'fs';
import path from 'path';
import {get_settings, set_settings} from './settings.js';

var client = new medium.MediumClient({
  clientId: global.process.env['MEDIUM_CLIENT'],
  clientSecret: global.process.env['MEDIUM_SECRET']
});

const redirectURL = 'http://www.gavin.codes';
let win = new BrowserWindow({ width: 800, height: 600, show: false });

var url = client.getAuthorizationUrl('secretState', redirectURL, [
  medium.Scope.BASIC_PROFILE, medium.Scope.PUBLISH_POST, medium.Scope.LIST_PUBLICATIONS
]);

function handleCallback(url, cb) {
  var raw_code = /code=([^&]*)/.exec(url) || null;
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  var error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    console.log(code);
    win.destroy();
  }

  // If there is a code, proceed to get token from github
  if (code) {
    client.exchangeAuthorizationCode(code, redirectURL, (err, token) => {
      client.getUser((err, user) => {
        user.token = token;
        get_settings((settings) => {
          console.log(settings);
          settings.user = user;
          set_settings(settings, (err) => {
            cb(user);
          });
        });
      });
    });
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Medium. Please try again.');
  }
}

export default function get(cb) {
  get_settings((settings) => {
    if (JSON.stringify(settings.user) !== '{}' && new Date() < new Date(settings.user.token.expires_at)) {
      console.log('quick', settings);
      win.close();
      return cb(settings.user);
    }

    win.on('closed', () => {
      win = null
    });

    win.webContents.on('will-navigate', (event, url) => {
      handleCallback(url, (user) => cb(user));
    });

    win.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleCallback(newUrl, (user) => cb(user));
    });

    win.loadURL(url);
    win.show();
  });
}