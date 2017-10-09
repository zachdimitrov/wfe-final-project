const port = 3003;
const connectionString = {
    default: 'mongodb://localhost/tennis-vission-db',
    deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/tennis-vission',
    // deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/heroku_br99x7gq',
};

const sessionSecret = 'Purple Unicorn';

module.exports = { port, connectionString, sessionSecret };
