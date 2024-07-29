import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Item } from '../../items/entities/item.entity';
import { ItemsService } from '../../items/items.service';

const orderList = [
  new Order({ orderNumber: 1, orderDescription: 'Pedido 1' }),
  new Order({ orderNumber: 2, orderDescription: 'Pedido 2' }),
  new Order({ orderNumber: 3, orderDescription: 'Pedido 3' }),
];

const itemList = [
  new Item({
    orderId: 1,
    numberItem: 1,
    itemDescription: 'Arroz 5kg',
    typeOfItems: 'product',
    quantity: 10,
    unitValue: 5.5,
  }),
  new Item({
    orderId: 2,
    numberItem: 2,
    itemDescription: 'Digitação',
    typeOfItems: 'service',
    quantity: 2,
    unitValue: 225,
  }),
  new Item({
    orderId: 3,
    numberItem: 3,
    itemDescription: 'Mesa',
    typeOfItems: 'location',
    quantity: 10,
    unitValue: 45.9,
  }),
];

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        ItemsService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            calculateItemValue: jest.fn().mockResolvedValue(orderList),
            create: jest.fn().mockResolvedValue(orderList),
            createItemOrder: jest.fn().mockResolvedValue(orderList),
            findAll: jest.fn().mockResolvedValue(orderList),
            findOne: jest.fn().mockResolvedValue(orderList),
            update: jest.fn().mockResolvedValue(orderList),
            remove: jest.fn().mockResolvedValue(orderList),
          },
        },
        {
          provide: getRepositoryToken(Item),
          useValue: {
            create: jest.fn().mockResolvedValue(itemList),
            findAll: jest.fn().mockResolvedValue(itemList),
            findOne: jest.fn().mockResolvedValue(itemList),
            update: jest.fn().mockResolvedValue(itemList),
            remove: jest.fn().mockResolvedValue(itemList),
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a order list successfully', async () => {
      const result = await orderService.findAll();

      expect(result);
    });
  });

  //describe();
});
