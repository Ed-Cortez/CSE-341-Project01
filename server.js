// Express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const path = require('path');



const port = process.env.PORT || 4000;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database is listening and node:) ${port}`)});
}
})




/*
const { MongoClient } = require('mongodb');
async function main() {

    const uri = "mongodb+srv://edu2537951:<password>@cse341.pbymga9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();

        await listDatabases(client);

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

*/