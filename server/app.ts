import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(async connection => {

    console.log("todo ...");

}).catch(error => console.log(error));
