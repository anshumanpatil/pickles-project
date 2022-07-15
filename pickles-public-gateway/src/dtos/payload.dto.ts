import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class PayloadDto {
  @IsEmail()
  public emailTo: string;
  
  @IsEmail()
  public emailFrom: string;
  
  @IsString()
  public emailText: string;
  
  @IsBoolean()
  public isKafka: boolean;
  
}