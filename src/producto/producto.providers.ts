import { Producto } from './entities/producto.entity';

export const productoProvider = [
  {
    provide: 'ProductoRepository',
    useValue: Producto,
  },
];
