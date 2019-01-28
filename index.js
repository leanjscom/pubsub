
const path = require("path")
const yaml = require("./src/yaml")


exports.loadFrom = filepath => {
	const doc = yaml.loadFileSync(topicsFile)
	return doc.topics
}
