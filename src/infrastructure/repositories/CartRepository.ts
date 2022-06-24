import { inject, injectable, named } from 'inversify';

import { EVENT_STREAM_NAMES, TYPES } from '@constants/types';
import { IEventStore } from '@core/IEventStore';
import { Cart } from '@domain/cart/Cart';
import { ICartRepository } from '@domain/cart/ICartRepository';

import { Repository } from './Repository';

@injectable()
export class CartRepository extends Repository<Cart> implements ICartRepository {
  constructor(@inject(TYPES.EventStore) @named(EVENT_STREAM_NAMES.Cart) private readonly eventstore: IEventStore) {
    super(eventstore, Cart);
  }
}
