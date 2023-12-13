import { Module } from "@nestjs/common";
import { PrismaService } from "../../common/services/prisma.client.service";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./services/user.service";

@Module({
  exports: [
    {
      provide: "UserServiceInterface",
      useClass: UserService,
    },
  ],
  providers: [
    {
      provide: "UserServiceInterface",
      useClass: UserService,
    },
    {
      provide: "UserRepositoryInterface",
      useClass: UserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
