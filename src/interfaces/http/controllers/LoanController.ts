import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response } from 'inversify-express-utils';

import { TYPES } from '@constants/types';
import { ICommandBus } from '@core/ICommandBus';
import { CreateLoanCommand } from '@storeback/loan/application/commands/CreateLoan';

import { ok } from '../processors/response';

@controller('/api/v1/loans')
export class LoanController {
  constructor(@inject(TYPES.CommandBus) private readonly commandBus: ICommandBus) {}

  @httpPost('')
  async createLoan(@request() req: Request, @response() res: Response) {
    const { bookId, userId } = req.body;
    const command = new CreateLoanCommand(bookId, userId);
    await this.commandBus.send(command);
    return res.json(ok('Successfully create loan request', undefined));
  }
}
