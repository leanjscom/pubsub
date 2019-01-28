
const path = require("path")
const yaml = require("./src/yaml")

if (!module.parent) {
	throw new Error("No parent module")
}
if (!module.parent.filename) {
	throw new Error("No parent module filename could be determined")
}

exports.loadFrom = filepath => {
	const doc = yaml.loadFileSync(topicsFile)
	return doc.topics
}
