const { loadFrom } = require("pubsub")

exports.topics = loadFrom(`${__dirname}/pubsub/topics.yaml`)
