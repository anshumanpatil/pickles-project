import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import { sendTestMail } from './utils';
import { ConsumerConfig, SimpleConsumer } from "kafka-typescript";

dotenv.config();

const app: Express = express();
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT;



const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const consumerConfig = new ConsumerConfig("localhost", "9092", "pickles");

const consumer = new SimpleConsumer()
  .create(rdkafkaConsumer, ["pickles"], consumerConfig)
  .onMessage(({ topic, key, value }) => {
    const body = JSON.parse(value.toString());
    const info = sendTestMail(body);
    console.log("--> Mail payload[KAFKA]", JSON.stringify(body, null, 4));
  })
  .connect()


app.post('/mail-manager', async (req: Request, res: Response) => {
  const info = sendTestMail(req.body);
  console.log("--> Mail payload[HTTP]", JSON.stringify(req.body, null, 4));
  res.json(info);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
