const axios = require('axios')
const console = require('../utils/console')
const express  = require('express')
const fs = require('fs')
const homedir = require('os').homedir();
const open = require('open')
const path = require('path')

const client_id = 'f9e4db3d86add100ffbb'
const client_secret = '91393ce01029a0ef3d30846a74a8a83d5ce6bbce'

function generateAuthUrl(){
 return `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=gist`
}
function makeAuthServer(){
 const app = express()
 app.get('/auth/callback',(request,response)=>{
	console.clearWaiting()
	const {code} = request.query
	receiveAuthCode(code,response)
 })
 app.listen(3000)
}
function receiveAuthCode(code,response){
 axios({
	method:'post',
	url:'https://github.com/login/oauth/access_token',
	headers:{
	 Accept: 'application/json'
	},
	params:{
	 client_id,
	 client_secret,
	 code
	}
 })
	.then(({data})=>{
	 if(data.error){
		console.error('An error occurred while checking the code:',data)
		response.sendFile(path.join(__dirname,'error.html'))
		setTimeout(process.exit,1000)
	 }
	 else{
		const {access_token} = data
		saveAccessToken(access_token,response)
	 }
	})
}
function saveAccessToken(access_token,response){
 axios({
	method:'get',
	url:'https://api.github.com/user',
	headers:{
	 'Authorization': `token ${access_token}`
	}
 })
	.then(({data:userData})=>{
	 console.info('Logged.  Welcome '+userData.login)
	 console.success()
	 response.sendFile(path.join(__dirname,'success.html'))
	 fs.writeFileSync(
		path.join(homedir,'.mytermuxsetup.json'),
		JSON.stringify({access_token})
	 )
	 setTimeout(process.exit,1000)
	})
	.catch(error=>{
	 console.error('An error occurred while verifying the access token.')
	 response.sendFile(path.join(__dirname,'error.html'))
	 setTimeout(process.exit,1000)
	})

}

module.exports =  function(){
 console.log(' 👋 Hello')
 console.info('Sign in with your Github account using the link:')
 makeAuthServer()
 const link = generateAuthUrl()
 console.log(console.chalk.underline(link))
 console.waiting()
 open(link)
}
