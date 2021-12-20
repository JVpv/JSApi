import EtherealMail from '@config/mail/etherealMail';
import AppError from '@shared/errors/appError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/usersRepository';
import UserTokensRepository from '../typeorm/repositories/userTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist!');
    }

    const { token } = await userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API JS] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}, sua solicitação de redefinição de senha foi recebida. {{token}}`,
        variables: {
          name: user.name,
          token: token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
