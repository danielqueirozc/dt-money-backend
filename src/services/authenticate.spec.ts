import { describe, expect, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateService } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('autheticate use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Daniel',
            email: 'daniel@example.com',  // Corrigi o email (@ faltando)
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'daniel@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))  // Corrigi "tofqual" para "toEqual"
    })
})