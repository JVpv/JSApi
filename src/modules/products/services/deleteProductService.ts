import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/productsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exist!');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
