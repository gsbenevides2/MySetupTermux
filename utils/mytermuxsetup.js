const console = require('./console')
const fs = require('fs')
const homedir = require('os').homedir();
const path = require('path')

const mytermuxsetup = {
 fileName:'.mytermuxsetup.json',
 fileDir:path.join(homedir,'.mytermuxsetup.json'),
 read(){
	try{
	 const fileDataString = fs.readFileSync(this.fileDir)
		.toString()
	 this.fileData = JSON.parse(fileDataString)
	 return this.fileData
	}
	catch(e){
	 console.error('Error when you try to read local configuration file.',e)
	 return null
	}
 },
 save(dataToSave){
	if(!dataToSave){
	 dataToSave = this.fileData
	}
	try{
	 const dataToSaveString = JSON.stringify(dataToSave)
	 fs.writeFileSync(this.fileDir,dataToSaveString)
	 this.fileData = dataToSave
	 return true
	}
	catch(e){
	 console.error('Error Saving local configuration file.',e)
	 return false
	}
 }
}

module.exports = mytermuxsetup
