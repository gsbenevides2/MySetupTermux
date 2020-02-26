const console = require('../utils/console')
const gist = require('../utils/gist')
const mytermuxsetup = require('../utils/mytermuxsetup')

module.exports = async ()=>{
 if(mytermuxsetup.read()){
	const {access_token} = mytermuxsetup.fileData
	if(access_token){
	 gist.makeGithubApi(access_token)
	 console.info("Accessing Gist")
	 await gist.find()
	 if(gist.setup_data){
		const files = Object.keys(gist.setup_data)
		if(files.length){
		 files.map(fileName=>{
			const fileDir = gist.setup_data[fileName]
			console.log(` • ${fileName}:${fileDir}`)
		 })
		}
		console.log(`${files.length} Files`)
	 }
	 else{
		console.error('Not found file setup_data in Gist')
	 }
	}
 }
}
