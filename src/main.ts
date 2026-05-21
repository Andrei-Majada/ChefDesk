import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

// Variável para cachear a instância da aplicação
let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors(); // Habilita CORS para a API

    // Configuração do Swagger (documentação da API)
    const config = new DocumentBuilder()
      .setTitle('ChefDesk API')
      .setDescription('Documentação da API do ChefDesk')
      .setVersion('1.0')
      .addTag('chefdesk')
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('docs', nestApp, document);

    await nestApp.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

// Exporta o handler para a Vercel
export default async (req: Request, res: Response) => {
  const server = await bootstrap();
  server(req, res);
};
