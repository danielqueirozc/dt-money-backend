import { app } from "@/app";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
    token: string
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error('Invalid credentials.')
        }
        
        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new Error('Invalid credentials.')
        }


        // cria o token
        const token = app.jwt.sign({
                sub: user.id,
                expiresIn: '1d'
        })

        return {
            user,
            token
        }

    }
}