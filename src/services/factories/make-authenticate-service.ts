import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate";
import { FastifyJwtProvider } from "@/providers/fastify-jwt-provider";

export function MakeAuthenticateService() {
    const usersRepository = new PrismaUsersRepository()
    const tokenProvider = new FastifyJwtProvider()
    const authenticateService = new AuthenticateService(usersRepository, tokenProvider)

    return authenticateService
}