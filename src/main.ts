import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import helmet from "@fastify/helmet";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { configureSwagger } from "./configs/swagger/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  if (process.env.NODE_ENV === "development") {
    configureSwagger(app);
  }

  await app.register(helmet);
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port, "0.0.0.0");
}

bootstrap().then(() => console.log("Server started"));
