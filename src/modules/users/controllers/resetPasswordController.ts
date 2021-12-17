import { Request, Response } from 'express';
import ResetPasswordService from '../services/resetPasswordService';

export default class ResetPasswordController {
  public async reset(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
}
