import { describe, expect, it, beforeEach } from 'vitest'

import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Daniel',
            email: 'daniel@example.com',  // Corrigi o email (@ faltando)
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))  // Corrigi "tofqual" para "toEqual"
    })
})