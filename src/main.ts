// if (process.env.NODE_ENV !== 'production') require('.env').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   allowedHeaders:"*",
  //   origin: "*"
  // });
  app.enableCors();
  // await app.listen(process.env.PORT || 8000);
  await app.listen(process.env.PORT);
}
bootstrap();
