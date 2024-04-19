import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder().setTitle("Assembleia API")
    .setDescription("Projeto Assembleia API").setVersion("1.0.0")
    .setContact("Danubio", "https://github.com/danubiobwm","danubio.bwm@gmail.com")
    .build()

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup("api", app, swaggerDoc);

  await app.listen(3000);
}
bootstrap();
