const line = require('@line/bot-sdk');
const express = require('express');
//import * as line from '@line/bot-sdk';
const translate = require('@vitalets/google-translate-api');

const config = {
    //channelAccessToken : '7GZRwN1V5s+2GT2mg9Gv/+SXFGl9eq/Y2x0ZgxIQSoJkzOoiSwF6wwU67tRuinKAdVPIlZ7QOJSMjy4UsfGZYomZRzz1zIidHl2Q7MWjwak9Tg4GYSrm/hqKstjVtFlCJv/W3a+dkBZNbXOeCZJMTQdB04t89/1O/w1cDnyilFU=',
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

    /*
    return client.replyMessage(event.replyToken, {
        type : 'text',
        text : 'Hello world'
    });
    */

    if(event.message.text == "mulai"){
        return client.replyMessage(event.replyToken, {
            type : 'text',
            text : 'Let\'s get started'
        });
    }else{
        return client.replyMessage(event.replyToken, {
            type : 'text',
            text : 'Oke, i am about to sleeping'
        });
    }

    /*
    translated(event.message.text, {
            to : 'en'
        })
        .then(res => {
            if(res.text != event.message.text){
                const translated = {
                    type : 'text',
                    text : res.text
                };
                return client.replyMessage(event.replyToken, translated);
            }
        })
        .catch(err => {
            console.error(err);
        });
    */
    
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});