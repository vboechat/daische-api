import { IsEmail, IsString } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  email: string;

  password: string;
}
