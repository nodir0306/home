import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as csurf from 'csurf';
import { AppModule } from './app';
import { ExceptionHandlerFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS enabled
  app.enableCors({
    origin: "*",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"]
  })

  // COMPRESSION
  app.use(compression())

  // CSURF configuration
  // app.use(csurf());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );

  app.useGlobalFilters(new ExceptionHandlerFilter());

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Feane restaurant API')
    .setDescription('The feane API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // USE MORGAN IN DEVELOPMENT MODE
  if (process.env?.NODE_ENV?.trim() == 'development') {
    app.use(morgan('tiny'));
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`);
  });
}
bootstrap();
