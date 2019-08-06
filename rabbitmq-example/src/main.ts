import { RabbitMQClient } from './rabbitmq/client';
import { RabbitMQServer } from './rabbitmq/server';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);

  const app1 = await NestFactory.createMicroservice(AppModule, {
    strategy: new RabbitMQServer('amqp://localhost', 'channel'),
  });

  const app2 = new RabbitMQClient('amqp://localhost', 'channel');
  app2.sendSingleMessage({ message: 'Hello World' }, () => {
    console.log('Callback');
  });

  app1.listen(() => console.log('object'));
}
bootstrap();
