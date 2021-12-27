import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/sendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async sendEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendPasswordEmail = new SendForgotPasswordEmailService();

    await sendPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}
