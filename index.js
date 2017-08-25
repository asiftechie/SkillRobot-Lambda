var Alexa = require('alexa-sdk');
const skillName = process.env.SKILL_NAME; // You must configure environment variable for Skill Name in your lambda
const vocalSkillName = process.env.VOCAL_SKILL_NAME; // You must configure environment variable for Vocal Skill Name in your lambda
const url = "xgvb4echb9.execute-api.us-east-1.amazonaws.com";
const path = "/prod/skillRobot";
const appId = process.env.ALEXA_APP_ID; // You must configure environment variable for Amazon Alexa ID in your lambda
const appIdGoogle = process.env.GOOGLE_APP_ID; // You must configure environment variable for Google Assistant ID in your lambda
const skillRobotAppId = process.env.SKILL_ROBOT_APP_ID; // You must configure environment variable for SkillRobot (VoiceIDE) ID in your lambda
const timeout = process.env.TIME_OUT; // You must configure environment variable for desired timeout in your lambda
const serverUrl = process.env.URL; // You must configure environment variable for your server URL in your lambda
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
const accountLinkageErrorText = "You require to link your account to alexa, please refer to the card on the alexa app";
const accountLinkageGoogleErrorText = "You require to link your account to google assistant, please refer to the card on the google home app";
const accountLinkageErrorTextGerman = "Sie benötigen, um Ihr Konto mit alexa zu verknüpfen, beziehen Sie sich bitte auf die Karte auf der alexa app";
const accountLinkageGoogleErrorTextGerman = "Sie benötigen, um Ihr Konto mit google assistant zu verknüpfen, beziehen Sie sich bitte auf die Karte auf der google home app";
var client;

function logInput(data) 
{
    console.log("input: "+data);
}

// API Call to Skill Robot 
function callSkillRobotAPI(data) 
{
    var https = require('https');
    // Set up the request header
    var post_options = {
      host: url,
      port: '443',
      path: path,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
      }
    };

    // Set up the request body
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        var str='';
        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            str = str.replace(/'/g, "\"");
            console.log('output: '+str);
            var json = JSON.parse(str);
            if (json.response=="ask") {
                client.emit(':ask', unescape(json.speech), skillName, unescape(json.speech));          
            }
            else if (json.response=="tellWithLinkAccountCard") {
                client.emit(':tellWithLinkAccountCard', unescape(json.speech));
            }
            else {
                if(json.speech == undefined) {
                    client.emit(':tell', "error occured ");              
                }
                else 
                {
                    client.emit(':tell', unescape(json.speech));          
                }
            }            
        }); 
    });

    // Post the data
    post_req.write(data);
    post_req.end();
}

// Checks if Token is empty
function isTokenEmpty(token,locale) {
    if (token == null) {
        if(locale=="de-DE") {
            client.emit(':tellWithLinkAccountCard', accountLinkageErrorTextGerman);
        }
        else {
            client.emit(':tellWithLinkAccountCard', accountLinkageErrorText);
        }
        return true;
    }
    else {
        return false;
    }
}

var handlers = {
    // Replace {IntentName} with the name of intent in your Alexa / Google Assistant configuration
    "{IntentName1}": function () {
        client = this;
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"{IntentName1}","slots":this.event.request.intent.slots,"timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            console.log("{IntentName1}");
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "{IntentName2}": function () {
        client = this;
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"{IntentName2}","slots":this.event.request.intent.slots,"timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            console.log("{IntentName2}");
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "{IntentName3}": function () {
        client = this;
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"{IntentName3}","slots":this.event.request.intent.slots,"timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            console.log("{IntentName3}");
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "HelpIntent": function () {
        client = this;
        console.log("help");
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"HelpIntent","timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "AMAZON.StopIntent": function () {
        client = this;
        console.log("stop");
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"AMAZON.StopIntent","timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "AMAZON.CancelIntent": function () {
        client = this;
        console.log("cancel");
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"AMAZON.CancelIntent","timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    "LaunchRequest": function () {
        client = this;
        console.log("launch:"+JSON.stringify(this.attributes));
        if(!isTokenEmpty(this.event.session.user.accessToken)) {
            if(this.attributes['firstTime'] == undefined) {
                this.attributes['firstTime'] = "true";
            }
            else if(this.attributes['firstTime'] == "true") {
                this.attributes['firstTime'] = "false";
            }
            
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"LaunchRequest","timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        this.emit(':saveState', true);
    },
    "Unhandled": function () {
        client = this;
        console.log("Unhandled");
        if(!isTokenEmpty(this.event.session.user.accessToken,this.event.request.locale)) {
            var post_data = JSON.stringify({"appId":skillRobotAppId,"sessionId":this.event.session.sessionId,"userId":this.event.session.user.userId,"accessToken":this.event.session.user.accessToken,"intent":"Unhandled","timestamp":this.event.request.timestamp,"locale":this.event.request.locale,"serverUrl":serverUrl,"attributes":this.attributes,"skillName":skillName,"vocalSkillName":vocalSkillName});
            logInput(post_data);
            callSkillRobotAPI(post_data);
        }
    }
};
 
// Start logic and register Alexa intents
exports.handler = function (event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = appId;
    alexa.dynamoDBTableName = process.env.TABLE;
    alexa.registerHandlers(handlers);
    alexa.execute();
};