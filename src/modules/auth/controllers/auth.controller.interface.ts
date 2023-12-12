import { SignInUserDto } from "src/modules/user/dtos/sign-in.user.dto";
import { UserPayloadEntity } from "../types/payload.type";
import { SignInResponse } from "../types/sign-in.response.type";
import { RequestUserDto } from "src/modules/user/dtos/request.user.dto";

export interface AuthControllerInterface {
  signUp(signUpDto: RequestUserDto): Promise<void>;
  signIn(signInDto: SignInUserDto): Promise<SignInResponse>;
  getUser(user: UserPayloadEntity): Promise<UserPayloadEntity>;
}
