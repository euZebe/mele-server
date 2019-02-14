/*
This file initializes your PostgreSQL database. You need to supply
the host name, username, password and database name for your database.
*/
import { createConnection } from "typeorm";
import { postgresTables } from "./postgrestables";
require("./db-credentials");

export const postgresDB = async () => {
  return await createConnection({
    type: "postgres",
    host: process.env.db_host,
    port: 5432,
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    ssl: true,
    entities: postgresTables,
    logging: ["query", "error"],
    synchronize: true
  }).then(() => {
    console.log("Database connection established");
  });
};
