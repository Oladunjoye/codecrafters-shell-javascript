const readline = require("readline");
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('$ ')

const validCommands =[ 'echo', 'type', 'exit']

function validatePathExistsAndIsExecutable(path){
  try {
    fs.accessSync(path, fs.constants.X_OK)
    return true
  } catch (error) {
    return false
  }
}
// PATH="/usr/bin:/usr/local/bin:$PATH" ./your_program.sh
function validatePathType(command){
  const {PATH:pathEnv} = process.env

  if (!pathEnv){
    return false
  }


  const splitPath = pathEnv.split(':')
  for (path of splitPath){
    const pathExistsAndIsExecutable =  validatePathExistsAndIsExecutable(path + '/' + command)
    if(pathExistsAndIsExecutable){
      console.log(`${command} is ${path}/${command}`)
      return true
    }
  }

  return false

}

 function handleTypeInput(input){
if (validCommands.includes(input)){
  console.log(`${input} is a shell builtin`)
}
else{

  const validPath =  validatePathType(input)

  if(!validPath){

    console.log(`${input}: not found`)
  }

}

return

}

function processInput(input){
  if(input === 'exit'){
    rl.close()
    return
  }
  else if(input.startsWith('echo')){
    console.log(input.slice(5))
  }
  else if(input.startsWith('type')){
    handleTypeInput(input.slice(5))
  }
  else{
  console.log(`${input}: command not found`)
  }
  rl.prompt()

}

rl.prompt()
rl.on('line', processInput)



// path  = /dir1:/dir2:/dir3 -> splits paths into /dir, /dir2. /dir3

// when yoy use type:
// - check if the inpourt is a valid builtin, , send genericic built in mesasge and return/
// - if notDeepEqual, check all the paths in the every directory provided, 
// if the file exist, check the execuratiable permissions
// if file exists and had executable perms, then print, command is full path
// else skip and contunye
// last case not found

