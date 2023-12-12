import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RequestUserDto } from "../dtos/request.user.dto";
import { UserEntity } from "../entity/user.entity";
import { UserServiceInterface } from "./user.service.interface";
import { UserRepositoryInterface } from "../repository/user.repository.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async create(userDto: RequestUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOne(userDto.email);

    if (userExists) {
      throw new ConflictException();
    }

    const userDtoPassword = userDto.password;
    const saltOrRounds = 14;
    const hashedPassword = await bcrypt.hash(userDtoPassword, saltOrRounds);
    userDto.password = hashedPassword;

    const user = await this.userRepository.create(userDto);

    return user;
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
