const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [
        'src/**/*.entity.ts'
    ],
    namingStrategy: new SnakeNamingStrategy()
};
