import CustomersRepository from '@modules/customers/infra/typeorm/repositories/customersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/productsRepository';
import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/order';
import OrdersRepository from '../infra/typeorm/repositories/ordersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: IRequest): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer does not exist!');
    }

    const existsProduct = await productsRepository.findAllByIds(products);

    if (!existsProduct.length) {
      throw new AppError('Could not find any products with the given IDs');
    }

    const existsProductsIds = existsProduct.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any product with the id ${checkInexistentProducts[0].id}.`,
      );
    }

    // Adicionando um comentário aqui para deixar claro: essa parte EM ESPECÍFICO será desnecessária na NPC,
    // ao menos enquanto ela não cobrir a lojinha. Esse trecho serve para comparar a quantidade de produtos
    // no estoque com a quantidade de produtos solicitados.
    const quantityAvailable = products.filter(
      product =>
        existsProduct.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `Product with id ${quantityAvailable[0].id} has less units on stock than the amount requested.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProduct.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const order_products = order?.order_products;

    const updatedProductQuantity = order_products?.map(product => ({
      id: product.product_id,
      quantity:
        existsProduct.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    if (updatedProductQuantity) {
      await productsRepository.save(updatedProductQuantity);
    }

    return order;
  }
}

export default CreateOrderService;
