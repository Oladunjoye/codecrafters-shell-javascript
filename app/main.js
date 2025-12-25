const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const processInput = (input)=>{
  if (input === 'exit'){
    rl.close()
    return
  }
  console.log(`${input}: command not found`)
   rl.question("$ ", (answer) => {
  processInput(answer)
 });


}
// TODO: Uncomment the code below to pass the first stage
rl.question("$ ", (answer) => {
  processInput(answer)
 });

 // appendix

//  import { createInterface } from "node:readline/promises";

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.setPrompt("$ ");
// rl.prompt();

// rl.on("line", async (line) => {
//   console.log(`${line}: command not found`)
//   rl.prompt()
// })
