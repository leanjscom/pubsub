# Upmentoring Pub/Sub


## Introduction

This is a generic library that allows deploying Google Cloud Pub/Sub topics, and publishing messages to them.

It is not supposed to be used on its own, but instead installed as a dependency of other projects, that define the actual topics.

For example, see the [Upmentoring Pub/Sub Repository](https://github.com/leanjscom/upmentoring-pubsub) which uses this one to manage topics in the Upmentoring project.

This project assumes that the parent project (the one that lists this one as a dependency) will have a file called `pubsub/topics.yaml` that contains a list of all the necessary pubsub topics.

## Motivation

The idea is to:

- Separate the names of the topics used in project code, from the names of the topics in Google Cloud
- Make it easy to deploy all those topics to Google Cloud with Google Deployment Manager


## Prerequisites

To deploy pub/sub topics, you need to have the [Google Cloud CLI](https://cloud.google.com/sdk/) installed, configured to point to the Google Cloud project that you are deploying the topics to, and logged into an appropriate Google Account (i.e. one with permissions to deploy topics to the target project).

For more information, see the [Upmentoring Google Cloud Proof of Concept](https://github.com/leanjscom/upmentoring-gcloud-poc).

