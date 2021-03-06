import { OrderUser } from '@storeback/order/domain/order-user';
import { UuidMother } from 'test/contexts/shared/uuid-mother';

export class OrderUserMother {
  static create(value: string): OrderUser {
    return new OrderUser(value);
  }

  static creator() {
    return () => OrderUserMother.random();
  }

  static random(): OrderUser {
    return this.create(UuidMother.random());
  }
}
