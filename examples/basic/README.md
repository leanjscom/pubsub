# Upmentoring Pub/Sub


## Introduction

This repository defines a YAML file containing the Google Cloud Pub/Sub topics in use in Upmentoring.

It can be used in two ways:

1.  It can be added to a project's NPM dependencies and then imported, to get a JSON object of all available Pub/Sub topics, which you can then use to publish messages to those topics.
2.	It can be cloned directly, and then used to deploy Pub/Sub topics to Google Cloud.

You can also use this repository as a basis for achieving the same thing for different projects.  Just fork, or copy, this repository and edit the file `pubsub/topics.yaml`.  *Note: this file must exist, or it will not be possible to use this module, either for deploying topics or publishing messages to them.*


## Motivation

The idea is to:

- Separate the names of the topics used in project code, from the names of the topics in Google Cloud
- Make it easy to deploy all those topics to Google Cloud with Google Deployment Manager


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).


## Get started

1.  Make sure you have a `pubsub/topics.yaml` file containing all the relevant topics for your project

2.  Run `npm install`

3.  Make sure that your index.js contains the following code:

```
const { topics } = require("pubsub")

exports.topics = topics
```


#### Deploying

From the root directory of the project, type the following command:

```
npm run deployments create [DEPLOYMENT_NAME] -- --config node_modules/pubsub/src/deploy.yaml

(first time)


npm run deployments update [DEPLOYMENT_NAME] -- --config node_modules/pubsub/src/deploy.yaml

(second and later times)

You should swap in a personal name for the deployment for DEPLOYMENT_NAME.

Note the extra set of dashes (--) before --config; this is intentional.  The two dashes tell NPM to pass the '--config' option to the target gcloud command rather than assume it is an option for NPM.
```
Later you can use `npm run deployments ...` to manage this and other deployments.

For example, if you have run a test deployment, you may wish to delete the deployment to avoid any charges.  To do this, run `npm run deployments delete DEPLOYMENT_NAME`.


#### Publishing messages.

1.  Import `topics` from this module into the relevant part of your code
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

#### Important things to notice

- Look at the `scripts` in package.json for the details of the `deployments` command
- Look in the file `pubsub/topics.yaml` for details of the format that the topics should be in
- Look at the contents of `index.js`, and make sure that they don't change, or at least, that the `topics` are both imported and exported from the script
