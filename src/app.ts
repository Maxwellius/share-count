import {createConnection} from "ionic-orm";
import Project from "./models/Project";

createConnection({
    driver: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test"
    },
    entities: [
        Project
    ],
    autoSchemaSync: true,
}).then(connection => {
    // here you can start to work with your entities
});