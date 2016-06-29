const medium = require('medium-sdk');
import * as UserActions from '../actions/user';
import fs from 'fs';
import path from 'path';
import {get_settings} from './settings';

var client = new medium.MediumClient({
  clientId: 'b126f4dc1ee3',
  clientSecret: '239a493502aa37b1a50f21160a085a7415edd9ca'
});

export default function create_post(options, cb) {
  get_settings((settings) => {
    let user = settings.user;
    console.log(options);
    client.setAccessToken(user.token.access_token).createPost({
      userId: user.id,
      title: options.title,
      contentFormat: medium.PostContentFormat.HTML,
      content: options.html,
      publishStatus: medium.PostPublishStatus[options.status],
      tags: options.tags
    }, function (err, post) {
      console.log(err, post);
      cb(post);
    });
  });
}