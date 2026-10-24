import { setUser } from "./config";
import { selectUser } from "./lib/db/users";

export type CommandHandler = (
    cmdName: string,
    ...args: string[]
) => Promise<void>;


export type CommandsRegistry = 
    /**
     * The command registry will just be an object with keys of command names
     *  and values of CommandHandler functions. 
     * This will hold all the commands the CLI can handle
     */
    Record<string, CommandHandler>;





export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    //- This function registers a new handler function for a command name.
    if (cmdName in registry){
        console.log(`Command ${cmdName} already registered`);
    }
    else {
        registry[cmdName] = handler;
    }
}


export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    //- This function runs a given command with the provided state if it exists.
    if (cmdName in registry){
        //registry.cmdName(args[0]);
        await registry[cmdName](cmdName, ...args);
    }
    else{
        console.log(`Command ${ cmdName } not found`);
    }
}


export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length < 1) {
        throw new Error("No user provided");
        
    }

    const username = args[0];
    if (!await selectUser(username)){
        throw new Error("User is not registered");
    }
    setUser(username);
    console.log(`User has been set: ${username}`);
}