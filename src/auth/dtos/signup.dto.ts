import { IsNotEmpty, IsString } from 'class-validator';
import { AuthDTO } from './auth.dto';

export class SignupDTO extends AuthDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
