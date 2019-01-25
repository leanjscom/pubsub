# Pub/Sub Example


## Introduction

This is an example of how you could use the [PubSub](https://github.com/leanjscom/pubsub) library to create a set of pub/sub topics for your project.

This project could be used in two ways:

1.  It could be added to a project's NPM dependencies and then imported, to get a JSON object of all available Pub/Sub topics, which you can then use to publish messages to those topics.
2.	It could be cloned directly, and then used to deploy Pub/Sub topics to Google Cloud.


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).


## Get started

1.  Copy this project, and use it as the basis for your project

2.  Make sure you have a `pubsub/topics.yaml` file containing all the relevant topics for your project

3.  Run `npm install`

4.  Make sure that your index.js contains the following code:

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
