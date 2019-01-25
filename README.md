# Upmentoring Pub/Sub


## Introduction

This is a generic library that allows deploying Google Cloud Pub/Sub topics, and publishing messages to them.

It is not supposed to be used on its own, but instead installed as a dependency of other projects, that define the actual topics.

For example, see the [Upmentoring Pub/Sub Repository](https://github.com/leanjscom/upmentoring-pubsub) which uses this one to manage topics in the Upmentoring project.

This project assumes that the parent project (the one that lists this one as a dependency) will have a file called `pubsub/topics.yaml` that contains a list of all the necessary pubsub topics.
