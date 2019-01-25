# Upmentoring Pub/Sub


## Introduction

This is a template for how to define Pub/Sub topics and deploy them to Google Cloud.

The idea is to:

- Separate the names of the topics used in project code, from the names of the topics in Google Cloud
- Make it easy to deploy all those topics to Google Cloud with Google Deployment Manager

This project can be used in application code (to know which topics to publish pub/sub messages to), and for deploying (to know which topics to create and maintain).

You will need to create a different fork of it for each app that you want to set-up pubsub topics for, and then either clone and use the fork for deploying topics, or import it into the relevant project to publish messages to the topics.


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).

For more information, see the [Upmentoring Google Cloud Proof of Concept](https://github.com/leanjscom/upmentoring-gcloud-poc).


## Get started

- Install npm dependencies

Before using this project for either deploying or using pub/sub topics, you need to run `npm install` to install the proejct's NPM dependencies.


#### Deploying

1. `cd` into the `src` directory.
2.  Set up the file `pubsub_topics.yaml` with a list of pub/sub topics for your app.  The top-level key `topics` should contain a dictionary, with app-side names of topics as the keys, and Google-side names of topics as the values.
3.  Use the Google Cloud CLI to deploy the topics.  The command to use will often be `gcloud deployment-manager deployments update DEPLOYMENT_NAME --config deploy.yaml` but, the first time you use it, will be `gcloud deployment-manager deployments create DEPLOYMENT_NAME --config deploy.yaml` (i.e. `create` rather than `update` as the second argument).
4.  If wished, `delete` the deployment to avoid incurring charges, i.e. run `gcloud deployment-manager deployments create DEPLOYMENT_NAME`.  (NB you can also use `list` to list all deployments that you have created and not deleted).  More info in [Google's Docs](https://cloud.google.com/deployment-manager/docs/quickstart)



#### Publishing messages.

1.  Add your fork of this package as a dependency of the relevant project, in its package.json
2.  In your project's code, in the place where you need to use the topics, import this package `import { topics } from 'upmentoring-pubsub` (substituting the name of your fork for 'upmentoring-pub-sub')
3.  You can then use items in 'topics' as topics to publish to, e.g. in pseudocode, `Google.publish({msg: 'some-message'}).to(topics.new_booking)`