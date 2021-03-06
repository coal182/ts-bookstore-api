import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';

import { TYPES } from '@constants/types';
import { IEventHandler } from '@core/i-event-handler';
import { OrderLineAdded } from '@storeback/order/domain/events/order-line-added';

@injectable()
export class OrderLineAddedEventHandler implements IEventHandler<OrderLineAdded> {
  public event = OrderLineAdded.name;

  constructor(@inject(TYPES.Db) private readonly db: Db) {}

  async handle(event: OrderLineAdded) {
    // nothing to do in this step
  }
}
