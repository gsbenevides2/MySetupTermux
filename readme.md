# MySetupTermux

[![Build Status](https://travis-ci.org/gsbenevides2/MySetupTermux.svg?branch=master)](https://travis-ci.org/gsbenevides2/MySetupTermux)
![npm](https://img.shields.io/npm/v/my-setup-termux)
![NPM](https://img.shields.io/npm/l/my-setup-termux)
<br/>
Save your configuration files easily and securely within GitHub Gist.

## Installation

Using npm:
```
npm install -g my-termux-setup
```
Using yarn:
```
yarn global add my-termux-setup
```

## Usage

First log into your Github account:
```
my-termux-setup login
```
### Add File
```
my-termux-setup add <file>
```
### Remove File
```
my-termux-setup remove <file>
```
### List Files
```
my-termux-setup list
```
### Update Gist
This command will read the directories of files already sent to gist. And send each one of them back to Gist and update them.
```
my-termux-setup updateGist
```
### Downloading all files
```
my-termux-setup downloadGist
```

## Gist Structure

The Gist with a file called 'setup_data' in it contains the directories from which the files were sent.
 The rest of the files are the files sent, for security the created gist is private.
