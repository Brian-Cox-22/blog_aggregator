import { readConfig, setUser } from "./config";
import { createUser, getUsers, resetDB, selectUser } from "./lib/db/users";


export async function handlerRegisterUser(cmdName: string, ...args: string[]){
    if (args.length < 1) {
        throw new Error("No user provided");
    }
    //console.log(1);
    const name = args[0];

    // Check if the user already exists here
    if (await selectUser(name)){
        throw new Error(`User "${name}" already exists`);
    }

    // create the user
    const newUser = await createUser(name);
    setUser(newUser.name);

    //console.log(3);
    console.log(`User created: ${newUser.name}`);
    console.log(newUser);
}

export async function handlerReset(cmdName: string, ...args: string[]){
    console.log("Resetting the database");
    
    try{
        await resetDB();
        console.log("Database reset");
    }

    catch{
        throw new Error("An error occured resetting the database");
    }
}

export async function handlerGetUsers(cmdName: string, ...args: string[]){
    const users = await getUsers();
    //console.log(users[0].name);
    const currentUser = readConfig().currentUserName;

    for (let position in users){
        const user = users[position].name
        if (user === currentUser){
            console.log(`* ${user} (current)`);
        }
        else {
            console.log(`* ${user}`);
        }
    }
}
