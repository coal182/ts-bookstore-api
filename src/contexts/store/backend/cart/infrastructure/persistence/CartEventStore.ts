import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';

import { TYPES } from '@constants/types';
import { IEventBus } from '@core/IEventBus';
import { IEventStore } from '@core/IEventStore';
import { EventStore } from '@infrastructure/eventstore/EventStore';

@injectable()
export class CartEventStore extends EventStore implements IEventStore {
  constructor(@inject(TYPES.Db) private readonly db: Db, @inject(TYPES.EventBus) private readonly eventBus: IEventBus) {
    super(db.collection('carts-events'), eventBus);
  }
}
