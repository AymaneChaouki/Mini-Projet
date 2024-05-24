import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import amqp from 'amqplib';
import Livre from './routes/livre.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

var channel, connection;
var url = process.env.AMQP_URL || 'amqp://localhost:5672';
var queue = 'api_livres';

async function connect() {
    try {
        connection = await amqp.connect(url);
        channel = await connection.createChannel();
        await channel.assertQueue(queue);
    } catch (error) {
        console.log(error);
    }
}

app.use('/api/livres',Livre);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
