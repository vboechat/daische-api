import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [
    {
      provide: "AuthServiceInterface",
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [
    {
      provide: "AuthServiceInterface",
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
