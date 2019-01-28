
const shell = require('shelljs')
const cli = require('commander')

cli
	.version("0.1.0")
	.option("-t --topics <topics-file>", "The path to the YAML file containing the list of topics")
	.option("-a --action <action-name>", "The action to perform on the specified deployment (e.g. create, update)")
	.option("-d --deployment [deployment-name]", "The name of the deployment to manage")
	.parse(process.argv)


if (cli.action !== "list" && !(cli.deployment && typeof cli.deployment === "string")) {
	throw new Error("Deployment name is mandatory for all actions other than 'list'")
}

const rgxSafeForShell = /^[a-zA-Z/_\-.]+$/

const topicsPath = cli.topics
if (!rgxSafeForShell.test(topicsPath)) {
	throw new Error("Unsafe topics-file path")
}

const actionName = cli.action
if (!rgxSafeForShell.test(actionName)) {
	throw new Error("Unsafe action name")
}

const deploymentName = cli.deployment
if (!rgxSafeForShell.test(deploymentName)) {
	throw new Error("Unsafe deployment name")
}


const cp = `cp '${topicsPath}' '${__dirname}'`
const action = `gcloud deployment-manager deployments '${actionName}'`
const deployment = `${actionName === 'list' ? `` : `'${deploymentName}'`}`
const config = `${(actionName === 'delete' || actionName === "list") ? ``:` --config '${__dirname}/deploy.yaml'`}`
const cmd = `${cp} && ${action} ${deployment} ${config}`
console.log(cmd)
shell.exec(cmd)
