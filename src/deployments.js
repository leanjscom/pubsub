
const shell = require('shelljs')
const cli = require('commander')

cli
	.version("0.1.0")
	.option("-t --topics <topics-file>", "The path to the YAML file containing the list of topics")
	.option("-d --deployment <deployment-name>", "The name of the deployment to manage")
	.parse(process.argv)


const rgxSafeForShell = /^[a-zA-Z/_-]+$/

const topicsPath = cli.topics
if (!topicsPath.test(rgxSafeForShell)) {
	throw new Error("Unsafe topics-file path")
}

const deploymentName = cli.deployment
if (!deploymentName.test(rgxSafeForShell)) {
	throw new Error("Unsafe deployment name")
}

shell.exec(`cp '${topicsPath}' '${__dirname}' && gcloud deployment-manager deployments '${deploymentName}' --config '${__dirname}/deploy.yaml'`)
