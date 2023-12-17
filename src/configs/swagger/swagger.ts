import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: NestFastifyApplication) {
  if (process.env.SWAGGER === "false")
    return console.log(
      "Swagger is disabled due to env variable value set to false"
    );

  const config = new DocumentBuilder()
    .setTitle("Daische API")
    .setVersion("1.0")
    .addTag("daische")
    .build();

  const swaggerPath = process.env.SWAGGER_PATH ?? "docs/swagger";

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  console.log(`Swagger is running at /${swaggerPath}`);
}
