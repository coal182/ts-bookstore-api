import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';

import { TYPES } from '@constants/types';
import { PasswordNotMatchException, NotFoundException } from '@core/ApplicationError';
import { CommandBus } from '@infrastructure/commandBus';
import { CreateUserCommand } from '@storeback/user/application/commands/CreateUser';
import { UpdateUserCommand } from '@storeback/user/application/commands/UpdateUser';
import { UpdateUserPasswordCommand } from '@storeback/user/application/commands/UpdateUserPassword';

import { IAuthorReadModelFacade } from '../../../contexts/store/backend/author/infrastructure/projection/authors/ReadModel';
import { IUserReadModelFacade } from '../../../contexts/store/backend/user/infrastructure/projection/users/ReadModel';
import { verifyJWT_MW } from '../middlewares/auth';
import { ok } from '../processors/response';

@controller('/api/v1/users', verifyJWT_MW)
export class UserController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.AuthorReadModelFacade) private readonly authorReadModel: IAuthorReadModelFacade,
    @inject(TYPES.UserReadModelFacade) private readonly userReadModel: IUserReadModelFacade
  ) {}

  @httpPost('')
  async createUser(@request() req: Request, @response() res: Response) {
    const { email, firstname, lastname, dateOfBirth, password } = req.body;

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const command = new CreateUserCommand(email, firstname, lastname, new Date(dateOfBirth), hash);
    await this.commandBus.send(command);
    return res.json(ok('Successfully created the user', undefined));
  }

  @httpGet('/')
  async getAllAuthors(@request() req: Request, @response() res: Response) {
    const authors = await this.authorReadModel.getAll();
    return res.json(ok('Successfully retrieved all authors', authors));
  }

  @httpGet('/:guid')
  async getById(@request() req: Request, @response() res: Response) {
    const user = await this.userReadModel.getById(req.params.guid);
    return res.json(ok('Successfully retrieve the user', user));
  }

  @httpPut('/:guid')
  async updateUser(@request() req: Request, @response() res: Response) {
    const { email, firstname, lastname, dateOfBirth, version } = req.body;

    const userData = await this.userReadModel.getById(req.params.guid);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const command = new UpdateUserCommand(req.params.guid, email, firstname, lastname, dateOfBirth, version);
    await this.commandBus.send(command);
    return res.json(ok('Successfully updated the user', undefined));
  }

  @httpPut('/:guid/password')
  async updatePassword(@request() req: Request, @response() res: Response) {
    const { currentPassword, newPassword, newPasswordConfirm, version } = req.body;

    const userData = await this.userReadModel.getById(req.params.guid);

    if (!compareSync(currentPassword, userData.password)) {
      throw new PasswordNotMatchException('Current password do not match');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new PasswordNotMatchException('New Passwords do not match');
    }

    const salt = genSaltSync(10);
    const hash = hashSync(newPassword, salt);

    const command = new UpdateUserPasswordCommand(req.params.guid, hash, version);
    await this.commandBus.send(command);
    return res.json(ok('Successfully updated the user', undefined));
  }
}
