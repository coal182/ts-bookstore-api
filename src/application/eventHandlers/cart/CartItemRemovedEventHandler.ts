import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';

import { TYPES } from '@constants/types';
import { IEventHandler } from '@core/IEventHandler';
import { CartItem } from '@domain/cart/CartItem';
import { CartItemRemoved } from '@domain/cart/events/CartItemRemoved';

@injectable()
export class CartItemRemovedEventHandler implements IEventHandler<CartItemRemoved> {
  public event = CartItemRemoved.name;

  constructor(@inject(TYPES.Db) private readonly db: Db) {}

  async handle(event: CartItemRemoved) {
    const cart = await this.db.collection('carts').findOne({ _id: event.guid });
    console.log(
      '🚀 ~ file: CartItemRemovedEventHandler.ts ~ line 17 ~ CartItemRemovedEventHandler ~ handle ~ cart',
      cart
    );
    if (cart) {
      const newItems = cart.items.filter((item: CartItem) => item.bookId != event.item.bookId);
      console.log(
        '🚀 ~ file: CartItemRemovedEventHandler.ts ~ line 19 ~ CartItemRemovedEventHandler ~ handle ~ newItems',
        newItems
      );
      await this.db
        .collection('carts')
        .updateOne({ _id: event.guid }, { $set: { items: newItems, version: event.version } });
    }
  }
}