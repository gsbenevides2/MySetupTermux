const console = require('../utils/console')
const fs = require('fs')
const gist = require('../utils/gist')
const homedir = require('os').homedir();
const mytermuxsetup = require('../utils/mytermuxsetup')
const path = require('path')

module.exports = async receivedFileName=>{
 console.info(`Reading received file: ${receivedFileName}`)
 const receivedFileDir = path.join(
	process.cwd(),
	receivedFileName
 )
 const receivedFileContent = fs.readFileSync(receivedFileDir).toString()

 console.info('Accessing gist.')
 if(mytermuxsetup.read()){
	const {access_token} = mytermuxsetup.fileData
	if(access_token){
	 gist.makeGithubApi(access_token)
	 await gist.find()
	 console.info('Sending file.')
	 await gist.addFile(receivedFileName,receivedFileDir,receivedFileContent)
	 console.success('Success')
	}
	else{
	 console.error('Access token was not found in the local configuration file.',`Try to run the ${console.command('login')} command.`)
	}
 }
}

