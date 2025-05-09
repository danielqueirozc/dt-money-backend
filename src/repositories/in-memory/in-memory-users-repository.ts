import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(item => item.id === id)

        if (!user ) {
            return null
        }

        return user
    }

    async findByEmail(email:string): Promise<User | null> {
        const user = this.users.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            ...data
        }

        this.users.push(user)

        return user
    }
}