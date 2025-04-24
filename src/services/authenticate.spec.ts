import { describe, expect, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateService } from './authenticate'
import { TokenProvider } from './token-provider'


// o foco e testar a camada de autenticacao entao nao precisa gerar o token real / verdadeiro
class FakeTokenProvider implements TokenProvider {
    sign(payload: object) {
        return 'fake-token'
    }
}

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('autheticate use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        const tokenProvider = new FakeTokenProvider()
        sut = new AuthenticateService(usersRepository, tokenProvider)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Daniel',
            email: 'daniel@example.com', 
            password_hash: await hash('123456', 6)
        })

        const { user, token } = await sut.execute({
            email: 'daniel@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
        expect(token).toEqual('fake-token')
    })
})