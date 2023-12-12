import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInResponse } from "../types/sign-in.response.type";
import { AuthServiceInterface } from "./auth.service.interface";
import { UserServiceInterface } from "src/modules/user/services/user.service.interface";
import * as bcrypt from "bcrypt";
import { RequestUserDto } from "src/modules/user/dtos/request.user.dto";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject("UserServiceInterface")
    private readonly userService: UserServiceInterface,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUpDto: RequestUserDto): Promise<void> {
    await this.userService.create(signUpDto);
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const user = await this.userService.findOne(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
    };

    const generateToken = await this.jwtService.signAsync(payload);

    const response = {
      token: generateToken,
    };

    return response;
  }
}
