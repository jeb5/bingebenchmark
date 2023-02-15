import knexConnector, { Knex } from "knex";
import pg from "pg";
pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number);

const knex = knexConnector({
	client: "pg",
	connection: {
		host: "localhost",
		port: parseInt(process.env.PG_DB_PORT!),
		user: process.env.PG_DB_USER!,
		password: process.env.PG_DB_PASSWORD!,
		database: "test_db",
	},
});
export default knex;
