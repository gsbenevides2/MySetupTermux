#!/usr/bin/env node

const program = require('commander');

const package = require('./package.json');
program.version(package.version);

program
 .command('login')
 .description('Log in with your GitHub account.')
 .action(()=>require('./commands/login')())
program
 .command('add <file>')
 .description('Adds the file to gist on GitHub.')
 .action(file=>require('./commands/add')(file))
program
 .command('remove <fileName>')
 .description('Remove the file to gist on GitHub')
 .action((fileName)=>require('./commands/remove')(fileName))
program
 .command('list')
 .description('List files in the gist.')
 .action(()=>require('./commands/list')())
program
 .command('updateGist')
 .description('Updates the files that are in the gist.')
 .action(()=>require('./commands/updateGist')())
program
 .command('downloadGist')
 .description('Download files in gist.')
 .action(()=>require('./commands/downloadGist')())

program.parse(process.argv)
