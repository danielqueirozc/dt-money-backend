import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    user: User
}

export class RegisterService {
    constructor (private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterRequest): Promise<RegisterResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('User already exists.')
        }

        const password_hash = await hash(password, 7)

        const user = await this.usersRepository.create({ name, email, password_hash })

        return {
            user
        }
    }
}