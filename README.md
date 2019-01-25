# Upmentoring Pub/Sub


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

2.  Create a file in the parent project called `pubsub/topics.yaml` that contains a list of topics, in the following format:

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
const { topics } = require("pubsub")

exports.topics = topics
```
At the very least, the index file should import the topics, and export them.


4.  Make sure that your parent project's `package.json` contains a `script` that copies in the `pubsub/topics.yaml` before using this module to deploy topics to Google Cloud.

```
  "scripts": {
  	"deployments": "cp $INIT_CWD/pubsub/topics.yaml node_modules/pubsub/src && gcloud deployment-manager deployments"
  }
```

See the [example implementation](https://github.com/leanjscom/pubsub/tree/master/examples/basic) for mode details

