import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, HttpError } from 'routing-controllers';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { PayloadDto } from '@dtos/payload.dto';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { MAIL_URL } from '@config';
import { logger } from '@utils/logger';
import { ProducerConfig, createTopicProducer, producers, SimpleProducer } from '@utils/kafka';



@Controller('/public-gateway')
export class MailController {

  @Post('/send')
  @UseBefore(validationMiddleware(PayloadDto, 'body'))
  async sendMailMessage(@Body() payload: PayloadDto) {
    if (payload.isKafka) {
      const load = await producers["pickles"].send("1", new Buffer(JSON.stringify(payload)));
      return load.getTopic();
    }
    try {
      const response = await axios.post(MAIL_URL, payload);
      const data = await response.data;
      return { data };
    } catch (error) {
        if(error instanceof AxiosError ) {
          console.log(error.message);
          if (error.code === 'ECONNREFUSED') {
            throw new HttpError(504, "Server Down!")
          };
          console.log(error.response);
          
        }
    }
  }
}
