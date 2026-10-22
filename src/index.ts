import { readConfig } from "./config";
import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commands";

function main() {
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  //console.log(`Registry: ${registry.login}`);

  //console.log(readConfig());

  // get processes passed in by the user
  const args = cleanArgs();
  const commandName = args[0].toLocaleLowerCase();
  const argArray = args.slice(1);
  
  // run the command
  runCommand(registry, commandName, ...argArray);

}

function cleanArgs() {
  const rawArgs = process.argv.slice(2);

  if (rawArgs.length < 1){
    console.log("Error: no commands detected");
    process.exit(1);
  }

  /*
  let outputArgs = [];
  for (let arg of rawArgs){
    outputArgs.push(arg.toLocaleLowerCase());
  }
    */
  
  return rawArgs;
}


main();