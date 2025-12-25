const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('$')

function processInput(input){
  if(input === 'exit'){
    rl.close()
    return
  }
  else if(input.startsWith('echo')){
    console.log(input.slice(5))
  }
  else{
  console.log(`${input}: command not found`)
  }
  rl.prompt()

}

rl.prompt()
rl.on('line', processInput)
