const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars API',
        description: 'Cars Api'
    },
    host: 'cse-341-project01.onrender.com',
    schemes: ['https']
};

const outputFile =  './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);