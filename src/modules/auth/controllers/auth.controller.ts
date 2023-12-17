import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Inject,
} from "@nestjs/common";
import { SignInUserDto } from "../../../modules/user/dtos/sign-in.user.dto";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { UserPayloadEntity } from "../types/payload.type";
import { SignInResponse } from "../types/sign-in.response.type";
import { AuthControllerInterface } from "./auth.controller.interface";
import { AuthServiceInterface } from "../services/auth.service.interface";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";

@Controller("auth")
export class AuthController implements AuthControllerInterface {
  constructor(
    @Inject("AuthServiceInterface") private authService: AuthServiceInterface
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async signUp(@Body() signUpDto: RequestUserDto): Promise<void> {
    await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: SignInUserDto): Promise<SignInResponse> {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );

    return token;
  }

  @UseGuards(AuthGuard)
  @Get("user")
  async getUser(@User() user: UserPayloadEntity): Promise<UserPayloadEntity> {
    return user;
  }
}
