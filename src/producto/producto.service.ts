import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @Inject('ProductoRepository')
    private productoModel: typeof Producto,
  ) {}

  async create(createProductoDto: CreateProductoDto, createOption) {
    let producto = null;
    try {
      producto = await this.productoModel.create({
        createOption,
        ...createProductoDto,
      });
    } catch (error) {
      throw new HttpException(
        `Error al crear el producto. ${error.toString()}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Creado Correctamente',
      data: producto,
    };
  }

  async findAll() {
    let productos;
    try {
      productos = await this.productoModel.findAll({
        order: [['precio', 'DESC']],
      });
    } catch (error) {
      throw new HttpException(
        'Error al consultar ' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (productos.length == 0) {
      throw new HttpException(
        'Todavia no hay productos ',
        HttpStatus.NOT_FOUND,
      );
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: productos };
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const updates = Object.keys(updateProductoDto);
    const allowedUpdates = ['nombre', 'descripcion', 'precio']; //fields of Organization entity
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      throw new HttpException(
        'Los campos no son validos para actualizar.',
        HttpStatus.BAD_REQUEST,
      );
    }
    let producto = null;
    try {
      producto = await this.productoModel.findByPk<Producto>(id);
    } catch (error) {
      console.log(error);
    }
    if (!producto) {
      throw new HttpException(
        'No se ha encontrado el producto.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const [numberOfAffectedRows, [updatedPost]] =
        await this.productoModel.update(
          { ...updateProductoDto },
          { where: { id }, returning: true },
        );
      return {
        numberOfAffectedRows,
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        'El poroducto no se puede actualizar.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    let producto = null;
    try {
      producto = await this.productoModel.findByPk<Producto>(id);
    } catch (error) {
      console.log(error);
    }
    if (!producto) {
      throw new HttpException(
        'El producto no se ha encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.productoModel.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'El producto no puede ser eliminado.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'OK borrado correctamente.',
      data: {},
    };
  }
}
