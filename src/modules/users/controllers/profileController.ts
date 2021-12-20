import { Request, Response } from 'express';
import ShowProfileService from '../services/showProfileService';
import UpdateProfileService from '../services/updateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
