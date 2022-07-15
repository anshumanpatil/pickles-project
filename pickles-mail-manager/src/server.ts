import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/mail-manager', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send('Mail Sent Success');
  }, 10000)
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
