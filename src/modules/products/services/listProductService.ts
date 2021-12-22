import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/redisCache';
import Product from '../typeorm/entities/product';
import { ProductsRepository } from '../typeorm/repositories/productsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('apijs-PRODUCT_LIST');

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('apijs-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
