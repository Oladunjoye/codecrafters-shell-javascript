const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const processInput = (input)=>{
  console.log(`${input}: command not found`)
   rl.question("$ ", (answer) => {
  processInput(answer)
 });


}
// TODO: Uncomment the code below to pass the first stage
rl.question("$ ", (answer) => {
  processInput(answer)
 });
