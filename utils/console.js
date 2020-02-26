const chalk = require('chalk')

module.exports = {
 error(message,error){
	console.error(chalk.red(` x  ${message}`))
	console.error(chalk.red(error))
 },
 info(){
	const i = chalk.blue(' i ')
	console.log.apply(console,[i,...arguments])
 },
 success(){
	console.log(chalk.green(' ✓  Success'))
 },
 waiting(){
	this.waiting = (function() {
	 const P = ["\\", "|", "/", "-"];
	 const D = ["   ",".  ",".. ","..."]
	 let x = 0;
	 process.stdout.write("\r " + chalk.blue(P[x]) + ' Waiting'+D[x]);
	 return setInterval(function() {
		x &= 3;
		process.stdout.write("\r " + chalk.blue(P[x]) + ' Waiting'+D[x]);
		x++
	 }, 250);
	})();
 },
 clearWaiting(){
	clearInterval(this.waiting)
	process.stdout.write("\r                 \r");
 },
 log:console.log,
 command:chalk.underline.bold,
 chalk
}
