import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Producto } from 'src/producto/entities/producto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @Inject('PedidoRepository')
    private pedidoModel: typeof Pedido,
  ) {}

  async create(createPedidoDtoArray) {
    let pedido = null;
    try {
      pedido = await this.pedidoModel.bulkCreate(createPedidoDtoArray);
    } catch (error) {
      throw new HttpException(
        `Error al crear el producto. ${error.toString()}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Creado Correctamente',
      data: pedido,
    };
  }

  async findAll() {
    let pedidos;
    try {
      pedidos = await this.pedidoModel.findAll({
        include: [{ model: Producto, required: true }],
      });
    } catch (error) {
      throw new HttpException(
        'Error al consultar ' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (pedidos.length == 0) {
      throw new HttpException('Todavia no hay pedidos ', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: pedidos };
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
