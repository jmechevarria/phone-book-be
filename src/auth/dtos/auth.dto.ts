import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export abstract class AuthDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  password: string;
}
