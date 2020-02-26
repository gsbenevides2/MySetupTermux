const axios = require('axios')
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
	 const {setup_data,files} = gist
	 const listOfFiles = Object.keys(setup_data)
	 console.info('Downloading files')
	 const process = listOfFiles.map((fileName,index)=>{
		return new Promise(async resolve=>{
		 console.info(`Downloading file: ${fileName}`)
		 const fileUrl = files[fileName].raw_url
		 const {data:fileContent}  = await axios({
			url:fileUrl,
			responseType:'text',
			transformResponse:null
		 })
		 const fileDir = setup_data[fileName]
		 fs.writeFileSync(fileDir,fileContent)
		 console.info(`Downloaded file: ${fileName}`)
		 resolve()
		}) 
	 })
	 Promise.all(process).then(console.success)
	}
 }
}
