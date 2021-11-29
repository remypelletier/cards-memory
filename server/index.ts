import "reflect-metadata";
import { createConnection } from "typeorm";
import { insertSampleData } from "./utils/sampleData/insertSampleData";
import app from "./app";

createConnection().then(async connection => {
    app.listen(3001, () => {
        console.log(`Example app listening at http://localhost:${3001}`)
    })

    // add fake data to database
    // await insertSampleData();

}).catch(error => console.log(error));
