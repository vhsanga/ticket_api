import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
