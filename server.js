'use strict';

var template = require( "./template.json" );
const config = require('./token.js');
 
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 8080;
 
const app = express();
 
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});
 
const client = new line.Client(config);
 
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
 
  var responsemsg = {};
  if (event.message.text == 'ボタン') {
    responsemsg = {
      type: 'template',
      altText: 'template alt text',
      template: template.output.line_template_button
    };
  } else if(event.message.text == '確認') {
    responsemsg = {
      type: 'template',
      altText: 'template alt text',
      template: template.output.line_template_confirm
    };
  } else if(event.message.text == 'カルーセル') {
    responsemsg = {
      type: 'template',
      altText: 'template alt text',
      template: template.output.line_template_carousel
    };
  } else if(event.message.text == '画像カルーセル') {
    responsemsg = {
      type: 'template',
      altText: 'template alt text',
      template: template.output.line_template_image_carousel
    };
  } else {
    responsemsg = {
      type: 'text',
      text: event.message.text
    };
  }
 
  
  return client.replyMessage(event.replyToken, responsemsg);
}
 
app.listen(PORT);
console.log(`Server running at ${PORT}`);