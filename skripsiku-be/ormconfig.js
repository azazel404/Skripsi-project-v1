const SnakeNamingStrategy = require("typeorm-naming-strategies").SnakeNamingStrategy;

module.exports = {
	type: "mysql",
	host: "165.232.167.226",
	port: "3306",
	username: "admin",
	password: "Playground!123",
	database: "skripsiku",
	entities: ["dist/**/*.entity{.ts,.js}"],
	synchronize: false,
	migrations: ["dist/src/migrations/*{.ts,.js}"],
	cli: {
		migrationsDir: "src/migrations/",
	},
	namingStrategy: new SnakeNamingStrategy(),
};
