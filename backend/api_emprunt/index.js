import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import amqplib from 'amqplib';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/books';
const amqp = process.env.AMQP_URL || 'amqp://localhost:5672';

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

var channel, connection;
var queue = 'api_clients';

async function connect() {
    connection = await amqplib.connect(amqp);
    channel = await connection.createChannel();
    await channel.assertQueue(queue);
}


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})