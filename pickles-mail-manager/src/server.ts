import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
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
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mathew.langworth@ethereal.email',
    pass: '1bBMJHcU9E5wGqWWWw'
  },
});

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const consumerConfig = new ConsumerConfig("localhost", "9092", "pickles");

const consumer = new SimpleConsumer()
  .create(rdkafkaConsumer, ["pickles"], consumerConfig)
  .onMessage(({ topic, key, value }) => {
    const body = JSON.parse(value.toString());
    console.log("--> Mail payload", JSON.stringify(body, null, 4));
  })
  .connect()


app.post('/mail-manager', async (req: Request, res: Response) => {

  let info = await transporter.sendMail({
    from: '"Pickles" <pickles@pickles.com>',
    to: req.body.emailTo, 
    subject: "Mail from pickles", 
    text: req.body.emailText,
    html: "<b>Welcome to car auction ?</b>", 
  });
  res.json(info);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
