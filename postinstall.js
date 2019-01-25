
const path = require("path")
const fs = require("fs")

if (!module.parent) {
	throw new Error("No parent module")
}
if (!module.parent.filename) {
	throw new Error("No parent module filename could be determined")
}

const parentRoot = path.dirname(module.parent.filename)

const copy = (src, dest) => {
	fs.copyFile(
		src,
		dest,
		(err) => {
	  		if (err) {
	  			throw err
	  		}
	  		console.log(`${src} was copied to ${dest}`);
		}
	);	
}

copy(`${__dirname}/src/deploy.yaml`, `${parentRoot}/pubsub/deploy.yaml`)
copy(`${__dirname}/src/pubsub_topics.py`, `${parentRoot}/pubsub/pubsub_topics.py`)


