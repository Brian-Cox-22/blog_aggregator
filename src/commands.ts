import { setUser } from "./config";

export type CommandHandler = (
    cmdName: string,
    ...args: string[]
) => void;


export type CommandsRegistry = Record<string, CommandHandler>;
    /**
     * The command registry will just be an object with keys of command names
     *  and values of CommandHandler functions. 
     * This will hold all the commands the CLI can handle
     */

    //login: "handlerLogin"

    //[commandName: string]: [handler: CommandHandler]



type commands = "login";



export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    //- This function registers a new handler function for a command name.
    if (cmdName in registry){
        console.log(`Command ${cmdName} already registered`);
    }
    else {
        registry[cmdName] = handler;
    }
}


export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    //- This function runs a given command with the provided state if it exists.
    if (cmdName in registry){
        //registry.cmdName(args[0]);
        registry[cmdName](cmdName, ...args);
    }
    else{
        console.log(`Command ${ cmdName } not found`);
    }
}


export function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length < 1) {
        //process.exit(1);
        throw new Error("No user provided");
        
    }
    const username = args[0];
    setUser(username);
    console.log(`User has been set: ${username}`);
}