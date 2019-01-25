
const path = require("path")
const yaml = require("./src/yaml")

if (!module.parent) {
	throw new Error("No parent module")
}
if (!module.parent.filename) {
	throw new Error("No parent module filename could be determined")
}

const parentRoot = path.dirname(module.parent.filename)
const topicsFile = `${parentRoot}/pubsub/topics.yaml`
const doc = yaml.loadFileSync(topicsFile)


exports.topics = doc.topics
