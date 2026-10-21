import { readConfig, setUser } from "./config";

function main() {
  setUser("Brian");

  console.log(readConfig());


}

main();