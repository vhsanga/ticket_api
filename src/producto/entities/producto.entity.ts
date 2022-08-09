import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'producto',
})
export class Producto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  nombre;

  @Column({
    type: DataType.STRING(128),
  })
  descripcion;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  precio;
}
