# Pub/Sub


## Introduction

This is a generic library that allows deploying Google Cloud Pub/Sub topics, and publishing messages to them.

It is not supposed to be used on its own, but instead installed as a dependency of other projects, which define the actual topics.

Those child projects can then be used in two ways:

1.  They can be added to a project's NPM dependencies and then imported, to get a JSON object of all available Pub/Sub topics, which you can then use to publish messages to those topics.
2.  They can be cloned directly, and then used to deploy Pub/Sub topics to Google Cloud.


## Motivation

The idea is to:

- Separate the names of the topics used in project code, from the names of the topics in Google Cloud
- Make it easy to deploy all those topics to Google Cloud with Google Deployment Manager


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).


## How to create a project that uses this to set-up pub/sub topics, and to publish messages to them

*Note: these steps should all be done inside the *parent* project (i.e. the one that lists this project as a dependency)*

### To set up the parent project


1.  Add this project as a dependency of the parent project

```
npm install --save leanjscom/pubsub
```

2.  Create a file in the parent project called, for example, `pubsub/topics.yaml` that contains a list of topics, in the following format:

```
topics:
  new_booking: testTopic111
  new_user: testTopic222
  new_cancellation_request: testTopic333
  completed_cancellation_request: testTopic444

```
The names on the left are the ones intended for use in your application code, and the ones on the right are what the topics are known by in Google Cloud


3.  Make sure that your parent project's index file contains the following code:

```
const { loadFrom } = require("pubsub")

exports.topics = loadFrom(`${__dirname}/pubsub/topics.yaml`)
```
At the very least, the index file should export a Javascript object containing the topics in the YAML file


### To deploy topics

Make sure that your parent project's `package.json` contains a number of `scripts` that run the `deploy` script in this project, as follows:

```
  "scripts": {
    "deployments": "node node_modules/pubsub/src/deployments.js --topics $INIT_CWD/pubsub/topics.yaml --action",
    "deployments-create": "npm run deployments create -- --deployment",
    "deployments-update": "npm run deployments update -- --deployment",
    "deployments-delete": "npm run deployments delete -- --deployment",
    "deployments-list": "npm run deployments list"
  }
```
You can then use these commands by specifying the command followed by the function name you wish to manage:
```
npm run deployments-create [DEPLOYMENT-NAME]
npm run deployments-update [DEPLOYMENT-NAME]
npm run deployments-delete [DEPLOYMENT-NAME]
npm run deployments-list
```

See the [example implementation](https://github.com/leanjscom/pubsub/tree/master/examples/basic) for mode details


### To publish messages to topics

1.  Import `topics` from the parent module into the relevant part of your code
2.  Publish message to the relevant topic

##### Example:

```
import { topics } from 'upmentoring-pubsub'
import { PubSub } from '@google-cloud/pubsub'


// Creates a client
const pubsub = new PubSub()

const sendMessage = async () => {
  const topicName = topics.new_booking
  const data = '{ name: 'Alice', time: '12pm' }'

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data)

  const messageId = await pubsub
    .topic(topicName)
    .publisher()
    .publish(dataBuffer);
  console.log(`Message ${messageId} published.`)
}

sendMessage()
```