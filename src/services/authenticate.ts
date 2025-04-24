import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { TokenProvider } from "./token-provider";

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
    token: string
}

export class AuthenticateService {
    constructor(
        private usersRepository: UsersRepository,
        private tokenProvider: TokenProvider
    ) {}

    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email)
        console.log("Usuário encontrado:", user)


        if (!user) {
            throw new Error('Invalid credentials.')
        }
        
        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new Error('Invalid credentials.')
        }


        // cria o token
        const token = this.tokenProvider.sign({ sub: user.id })

        return {
            user,
            token
        }

    }
}