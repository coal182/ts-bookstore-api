import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';

import { TYPES } from '@constants/types';
import { IEventHandler } from '@core/i-event-handler';
import { UserCreated } from '@storeback/user/domain/events/user-created';

@injectable()
export class UserCreatedEventHandler implements IEventHandler<UserCreated> {
  event = UserCreated.name;

  constructor(@inject(TYPES.Db) private readonly db: Db) {}

  async handle(event: UserCreated) {
    await this.db.collection('users').insertOne({
      id: event.guid,
      email: event.email,
      firstname: event.firstname,
      lastname: event.lastname,
      dateOfBirth: event.dateOfBirth.toString(),
      password: event.password,
      cersion: event.version,
    });
  }
}
