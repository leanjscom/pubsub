
const yaml = require("js-yaml")
const fs = require("fs")

const loadFileSync = (filename) => {
	try {
		const yamlString = fs.readFileSync(filename, 'utf8')
		return yaml.safeLoad(yamlString)
	} catch (e) {
		throw new Error(`Error loading topics from YAML: ${e.message}`)
	}
}

exports.loadFileSync = loadFileSync



