const console = require('../utils/console')
const gist = require('../utils/gist')
const mytermuxsetup = require('../utils/mytermuxsetup')

module.exports = async (fileName)=>{
 if(mytermuxsetup.read()){
	const {access_token} = mytermuxsetup.fileData
	if(access_token){
	 gist.makeGithubApi(access_token)
	 console.info("Accessing Gist")
	 await gist.find()
	 if(gist.setup_data[fileName]){
		console.info('Updating Gist')
		await gist.removeFile(fileName)
		console.success()
	 }
	 else{
		console.error('Reported file not found on Gist.','')
	 }
	 }
 }
}
