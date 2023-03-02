const http = require('http');
const app = require('./app');

const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log(`Connection Enstablished with MongoDB!!`);
});

mongoose.connection.on('error', () => {
    console.log(`Error Connection with Mongo!!!`);
});

async function createServer(){
    await mongoose.connect(mongoUrl);

    server.listen(port, () => {
            console.log(`server listening at ${port}`)
        })
}
createServer();