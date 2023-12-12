import { PrismaService } from "src/common/services/prisma.client.service";
import { RequestUserDto } from "../dtos/request.user.dto";
import { UserEntity } from "../entity/user.entity";
import { UserRepositoryInterface } from "./user.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(userDto: RequestUserDto): Promise<UserEntity> {
    const user = await this.prisma.accounts.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password: userDto.password,
      },
    });

    return user;
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.prisma.accounts.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
