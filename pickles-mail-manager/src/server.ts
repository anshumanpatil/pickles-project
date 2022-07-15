import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {ConsumerConfig, SimpleConsumer} from "kafka-typescript";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const consumerConfig = new ConsumerConfig("localhost", "9092", "pickles");

const consumer = new SimpleConsumer()
  .create(rdkafkaConsumer, ["pickles"], consumerConfig)
  .onMessage(({topic, key, value}) =>
    console.log("--> ", JSON.stringify(value, null, 4)))
  .connect()


app.get('/mail-manager', (req: Request, res: Response) => {
    res.send('Mail Sent Success');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
