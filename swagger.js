const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars API',
        description: 'Cars Api'
    },
    host: 'localhost:4000',
    schemes: ['http', 'https']
};

const outputFile =  './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);