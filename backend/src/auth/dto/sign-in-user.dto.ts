import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @Length(5, 60)
  email: string;

  @IsNotEmpty()
  @Length(5, 100)
  password: string;
}
