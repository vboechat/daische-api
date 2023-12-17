import { Module } from "@nestjs/common";
import { TaskModule } from "./modules/task/task.module";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    TaskModule,
    UserModule,
    AuthModule,
    CacheModule.register(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000 * 10, // 10 seconds
        limit: 20,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
