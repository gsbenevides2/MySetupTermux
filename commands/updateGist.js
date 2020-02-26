const console = require('../utils/console')
const fs = require('fs')
const gist = require('../utils/gist')
const mytermuxsetup = require('../utils/mytermuxsetup')

module.exports = async ()=>{
 if(mytermuxsetup.read()){
	const {access_token} = mytermuxsetup.fileData
	if(access_token){
	 gist.makeGithubApi(access_token)
	 await gist.find()
	 const {setup_data} = gist
	 const listOfFiles = Object.keys(setup_data)
	 const files = {}
	 console.info('Reading files to update')
	 listOfFiles.map(fileName=>{
		try{
		const fileDir = setup_data[fileName]
		const fileContent = fs.readFileSync(fileDir).toString()
		 files[fileName] = {content:fileContent}
		}catch(e){
		 console.error(`Error in read file ${fileName}; File skip`,e)
		}
	 })
	 console.info('Updating')
	 await gist.githubApi.patch(`/gists/${gist.id}`,{files})
	 console.success()
	}
 }
}
