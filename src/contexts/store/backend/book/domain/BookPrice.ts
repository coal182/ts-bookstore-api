import { InvalidArgumentError } from '@shared/valueObjects/invalid-argument-error';
import { NumberValueObject } from '@shared/valueObjects/number-value-object';

export class BookPrice extends NumberValueObject {
  public constructor(value: number) {
    super(value);
  }
}