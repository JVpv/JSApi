import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/order';
import OrdersRepository from '../typeorm/repositories/ordersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order does not exist!');
    }

    return order;
  }
}

export default ShowOrderService;
