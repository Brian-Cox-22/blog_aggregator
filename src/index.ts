
import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commands";
import { handlerGetUsers, handlerRegisterUser, handlerReset } from "./dbCommands";

async function main() {
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegisterUser);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerGetUsers);
  //console.log(`Registry: ${registry.login}`);

  //console.log(readConfig());

  // get processes passed in by the user
  const args = cleanArgs();
  const commandName = args[0].toLocaleLowerCase();
  const argArray = args.slice(1);
  
  // run the command
  await runCommand(registry, commandName, ...argArray);
  
  // exit
  process.exit(0)

}

function cleanArgs() {
  const rawArgs = process.argv.slice(2);

  if (rawArgs.length < 1){
    console.log("Error: no commands detected");
    process.exit(1);
  }
  
  return rawArgs;
}


main();