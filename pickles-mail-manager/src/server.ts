import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const Kafka = require('node-rdkafka');
var consumer = new Kafka.KafkaConsumer({
  'group.id': 'pickles',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['pickles']);
  consumer.consume();
}).on('data', function(data) {
  console.log(`received1 message: ${JSON.stringify(JSON.parse(data.value))}`);
});


app.get('/mail-manager', (req: Request, res: Response) => {
    res.send('Mail Sent Success');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
