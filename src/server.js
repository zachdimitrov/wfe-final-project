/* eslint no-console: 0 */
const config = require('./config');
const greeting = `Server started at: ${config.port}`;

Promise.resolve()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => console.log(greeting));
    });
