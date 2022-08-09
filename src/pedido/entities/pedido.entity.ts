import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Producto } from 'src/producto/entities/producto.entity';

@Table({
  tableName: 'pedido',
})
export class Pedido extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cantidad;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.INTEGER,
    field: 'id_producto',
    allowNull: false,
  })
  id_producto: Producto;

  @BelongsTo(() => Producto)
  producto: Producto;
}
