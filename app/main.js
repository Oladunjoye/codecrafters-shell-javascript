const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('$ ')

const validCommands =[ 'echo', 'type', 'exit']
function handleTypeInput(input){
if (validCommands.includes(input)){
  console.log(`${input} is a shell builtin`)
}
else{
  console.log(`${input}: not found`)

}

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


