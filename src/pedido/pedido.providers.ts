import { Pedido } from './entities/pedido.entity';

export const pedidoProvider = [
  {
    provide: 'PedidoRepository',
    useValue: Pedido,
  },
];
