import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  loginName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
