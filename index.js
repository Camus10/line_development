const line = require('@line/bot-sdk');
const express = require('express');
//import * as line from '@line/bot-sdk';

const config = {
    //channelAccessToken : 'bC4HkYUekVTsyq/+BBA3KxAlt57ZgUiHyqgJ0mTvS2t0umO5NkWJMe1dnluS+sUHdVPIlZ7QOJSMjy4UsfGZYomZRzz1zIidHl2Q7MWjwanyUlJk22y9nQXxAAK7anI1YWBlEoIU8EWLsWpdesq43QdB04t89/1O/w1cDnyilFU=',
    //channelSecret : '6fb35d6f57f7562ee5841ffad4cfd198'
    channelAccessToken : process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret : process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
//line.middleware(config);
const app = express();

app.get('/', (req, res) => {
    res.send('There\'s nothing here...');
    res.sendStatus(404);
});
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(mainProgram))
        .then((result) => res.json(result))
        .catch((error) => {
            console.error(`Promise error ${error}`);
        });
});

/*
Main idea of bot.
*/
function mainProgram(event){
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null);   // ignore message
    }
    return client.replyMessage(event.replyToken, {
        type : 'text',
        text : 'Hello world'
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {});