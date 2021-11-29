import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default {
   type: "mysql",
   host: "localhost",
   port: 3306,
   username: "user",
   password: "password",
   database: "cards_memory",
   synchronize: false,
   logging: true,
   namingStrategy: new SnakeNamingStrategy(), // use camelcase in code to snakecase in database column
   entities: [
      "entities/**/*.ts"
   ],
   migrations: [
      "migrations/**/*.ts"
   ],
   subscribers: [
      "subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "entities",
      migrationsDir: "migration",
      subscribersDir: "subscriber"
   }
}