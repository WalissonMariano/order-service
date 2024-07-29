import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Seja Bem Vindo(a) ao sistema de cadastro de pedidos';
  }
}
