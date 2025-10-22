import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Habilitar CORS para que el front (localhost:3000) pueda conectarse
  app.enableCors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
