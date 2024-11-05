import { Repository } from "typeorm";
import { OrderService } from "../order.service";
import { OrderItemsService } from "../../order-items/order-items.service";
import { ItemService } from "../../item/item.service";
import { Order } from "../entities/order.entity";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { OrderItems } from "../../order-items/entities/order-items.entity";
import { NotFoundException } from "@nestjs/common";

describe('OrderService', () => {
    let orderService: OrderService;
    let orderRepositoty: Repository<Order>;
    let orderItemsRepository: Repository<OrderItems>;
    let orderItemsService: OrderItemsService;
    let itemService: ItemService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          {
            provide: getRepositoryToken(Order),
            useClass: Repository,
          },
          {
            provide: getRepositoryToken(OrderItems),
            useClass: Repository,
          },
          {
            provide: OrderItemsService,
            useValue: {
              calculateTaxValue: jest.fn(),
              calculateTotalValue: jest.fn(),
            }
          },
          {
            provide: ItemService,
            useValue: {
              getItemById: jest.fn(),
            }
          }
        ],
      }).compile();
  
      orderService = module.get<OrderService>(OrderService);
      orderRepositoty = module.get<Repository<Order>>(getRepositoryToken(Order));
      orderItemsRepository = module.get<Repository<OrderItems>>(getRepositoryToken(OrderItems));
      orderItemsService = module.get<OrderItemsService>(OrderItemsService);
      itemService = module.get<ItemService>(ItemService);
      
    });
  
    describe('getAllOrders', () => {
      it('should return all orders with orderItems', async () => {
        const orders = [{ id: 1, orderItems: [] }];
        jest.spyOn(orderRepositoty, 'find').mockResolvedValueOnce(orders as Order[]);

        const result = await orderService.getAllOrders();
        expect(result).toEqual(orders);
      });

      it('should throw NotFoundException if no orders are found', async () => {
        jest.spyOn(orderRepositoty, 'find').mockResolvedValueOnce([]);

        await expect(orderService.getAllOrders()).rejects.toThrow(NotFoundException);
      });
    })

  
  });