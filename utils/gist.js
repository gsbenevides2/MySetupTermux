const axios = require('axios')

module.exports = {
 githubApi:null,
 makeGithubApi(accessToken){
	this.githubApi = axios.create({
	 baseURL:'https://api.github.com',
	 headers:{
		authorization: `token ${accessToken}`
	 }
	})
 },
 async find(){
	const {data:gistsData} = await this.githubApi.get('/gists')
	const gist = gistsData.find(gist=>gist.description==='setup-termux')
	if(gist){
	 this.id = gist.id
	 const setupDataUrl =  gist.files.setup_data.raw_url
	 const {data:setup_data} = await axios.get(setupDataUrl)
	 this.setup_data = setup_data
	 this.files = gist.files
	}
	else{
	 const {data:gistCreated} = await this.githubApi.post('/gists',{
		description:'setup-termux',
		files:{
		 setup_data:{content:'{}'}
		}
	 })
	 this.id = gistCreated.id
	 this.setup_data = {}
	}
 },
 async addFile(fileName,fileDir,fileContent){
	const files = {}
	files[fileName] = {content:fileContent}
	this.setup_data[fileName] = fileDir
	files.setup_data ={content:JSON.stringify( this.setup_data)}
	await this.githubApi.patch(`/gists/${this.id}`,{files})
 },
 async removeFile(fileName){
	const files = {}
	files[fileName] = null
	delete this.setup_data[fileName]
	files.setup_data ={content:JSON.stringify( this.setup_data)}
	await this.githubApi.patch(`/gists/${this.id}`,{files})
 }

}
