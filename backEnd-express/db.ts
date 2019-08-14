import { createConnection } from "typeorm";

import { Users }   from "./src/backend/entities/users";
import { Tweet }    from "./src/backend/entities/tweet";
import { Comment } from "./src/backend/entities/comment";
import { Like }    from "./src/backend/entities/like";


export async function createDbConnection() {
    // // Read the database settings from the environment variables
    // export DATABASE_HOST=localhost
    // export DATABASE_PORT=5432
    // export DATABASE_DB=twitterclone_db
    // export DATABASE_USER=postgres
    // export DATABASE_PASSWORD=secret
    
    // export AUTH_SECRET=miclaveprivada
    const DATABASE_HOST     = process.env.DATABASE_HOST;
    const DATABASE_PORT     = process.env.DATABASE_PORT;
    const DATABASE_DB       = process.env.DATABASE_DB;
    const DATABASE_USER     = process.env.DATABASE_USER;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

    // Display the settings in the console so we can see if something is wrong
    console.log(
        `
            host:     ${DATABASE_HOST}
            port:     ${DATABASE_PORT}
            db:       ${DATABASE_DB}
            user:     ${DATABASE_USER}
            password: ${DATABASE_PASSWORD}
        `
    );

    // Open database connection
    await createConnection({
        type:     "postgres",
        host:     DATABASE_HOST,
        port:     5432,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: [
            Comment,
            Tweet,
            Users,
            Like
        ],
        // This setting will automatically create database tables in the database server
        synchronize: true
    });

}