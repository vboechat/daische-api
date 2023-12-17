import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { SignInResponse } from "../types/sign-in.response.type";

export interface AuthServiceInterface {
  signUp(signUpDto: RequestUserDto): Promise<void>;
  signIn(email: string, password: string): Promise<SignInResponse>;
}
