import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ProductoModule,
    SequelizeModule.forRoot({
      //uri: 'postgresql://ticketuser:QpxeaTcsAJM9gCpK-Un5kA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dcurvy-insect-4010',
      uri: process.env.URL_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
