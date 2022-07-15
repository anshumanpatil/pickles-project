import App from '@/app';
import { MailController } from '@/controllers/mail.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([MailController]);
app.listen();
