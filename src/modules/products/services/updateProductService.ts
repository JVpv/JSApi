import RedisCache from '@shared/cache/redisCache';
import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductsRepository } from '../typeorm/repositories/productsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product does not exist!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('apijs-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
