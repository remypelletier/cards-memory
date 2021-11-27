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
      "entity/**/*.ts"
   ],
   migrations: [
      "migration/**/*.ts"
   ],
   subscribers: [
      "subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "entity",
      migrationsDir: "migration",
      subscribersDir: "subscriber"
   }
}