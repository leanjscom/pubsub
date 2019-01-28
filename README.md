# Pub/Sub


## Introduction

This is a generic library that allows deploying Google Cloud Pub/Sub topics, and publishing messages to them.

It is not supposed to be used on its own, but instead installed as a dependency of other projects, which define the actual topics.

## Motivation

The idea is to:

- Separate the names of the topics used in project code, from the names of the topics in Google Cloud
- Make it easy to deploy all those topics to Google Cloud with Google Deployment Manager


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).


## How to create a project that uses this to set-up pub/sub topics

### Note: these steps should all be done inside the *parent* project (i.e. the one that lists this project as a dependency)


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


4.  Make sure that your parent project's `package.json` contains a number of `scripts` that run the `deploy` script in this project, as follows (one per Google Deployment Manager action that you need to support, e.g. create, update):

```
  "scripts": {
  	"create-deployment": "node_modules/pubsub/src/deploy.js --action create --topics $INIT_CWD/pubsub/topics.yaml --deployment",
  	"update-deployment": "node_modules/pubsub/src/deploy.js --action update --topics $INIT_CWD/pubsub/topics.yaml --deployment"
  }
```

See the [example implementation](https://github.com/leanjscom/pubsub/tree/master/examples/basic) for mode details

