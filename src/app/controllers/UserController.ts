import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User';

class UserController {

    async index(request: Request, response: Response) {
        const repository = getRepository(User);

        const users = await repository.find()

        return response.json(users);
    }

    async store(request: Request, response: Response) {
        const repository = getRepository(User);
        const { email, password } = request.body;

        const userExists = await repository.findOne({ where: { email } });


        if (userExists) {
            return response.status(400).json({
                message: 'email needs to be unique'
            })
        }

        const user = repository.create({ email, password });

        await repository.save(user);

        return response.json({ message: 'user created' });
    }
}

export default new UserController()