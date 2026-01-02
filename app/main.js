const readline = require("readline");
const fs = require('fs')
const path = require('path');
const {spawnSync} = require('child_process');
const { argv0 } = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('$ ')

const validCommands = ['echo', 'type', 'exit']

/**
 * Checks if a file exists and has executable permissions.
 * @param {string} path - The full path to the file to check
 * @returns {boolean} True if file exists and is executable, false otherwise
 */
function validatePathExistsAndIsExecutable(path) {
  try {
    fs.accessSync(path, fs.constants.X_OK)
    return true
  } catch (error) {
    return false
  }
}
/**
 * Searches PATH directories for an executable command and prints its location.
 * @param {string} command - The command name to search for
 * @returns {boolean} True if executable found, false otherwise
 */
function validatePathType(command) {
  const { PATH: pathEnv } = process.env

  if (!pathEnv) {
    return false
  }

  const splitPath = pathEnv.split(path.delimiter)
  for (let dir of splitPath) {
    const fullPath =  dir + '/' + command
    const pathExistsAndIsExecutable = validatePathExistsAndIsExecutable(fullPath)
    if (pathExistsAndIsExecutable) {
      return fullPath
    }
  }

  return null
}



/**
 * Handles the 'type' builtin command. Reports if a command is a builtin or its PATH location.
 * @param {string} input - The command name to look up
 * @returns {void}
 */
function handleTypeInput(input) {
  if (validCommands.includes(input)) {
    console.log(`${input} is a shell builtin`)
  } else {
    const validPath = validatePathType(input)
    if (!validPath) {
      console.log(`${input}: not found`)
    }else{
      console.log(`${input} is ${validPath}`)

    }
  }
}

function handleExecutePath({program, args}) {
  const fullPath = validatePathType(program)
  if(fullPath){
   spawnSync(fullPath, args, {stdio:'inherit', argv0: program} )
  }else{
    handleInvalidCommand(program)
  }
}

/**
 * Prints an error message for unrecognized commands.
 * @param {string} input - The unrecognized command
 * @returns {void}
 */
function handleInvalidCommand(input) {
  console.log(`${input}: command not found`)
}

/**
 * Handles the 'exit' builtin command by closing the readline interface.
 * @returns {void}
 */
function handleExit() {
  rl.close()
  process.exit(0)
}

/**
 * Handles the 'echo' builtin command by printing arguments to stdout.
 * @param {string} input - The text to echo
 * @returns {void}
 */
function handleEchoInput(input) {
  console.log(input)
}

/** @type {Object.<string, function(string): void>} Map of builtin commands to their handlers */
const commandMap = {
  'echo': handleEchoInput,
  'type': handleTypeInput,
  'exit': handleExit,
}

function parseCommand(input) {
  const [command, ...args] = input.split(' ')
  return { command, args: args.join(' ') }
}

/**
 * Main input processor. Parses input and routes to appropriate command handler.
 * @param {string} input - The raw input line from the user
 * @returns {void}
 */
function processInput(input) {
  const { command, args } = parseCommand(input)
  const commandHandler = commandMap[command]

  if (commandHandler) {
    commandHandler(args)
  } else if(command){
    handleExecutePath({program: command, args: args.split(' ')})
  }
  else {
    handleInvalidCommand(command)
  }

    rl.prompt()
}

rl.prompt()
rl.on('line', processInput)


