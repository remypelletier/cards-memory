import "reflect-metadata";
import { createConnection } from "typeorm";
import { insertSampleData } from "./utils/sampleData/insertSampleData";


createConnection().then(async connection => {

    console.log("todo ...");

    // add fake data to database
    // await insertSampleData();

}).catch(error => console.log(error));

