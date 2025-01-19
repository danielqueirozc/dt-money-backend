import Fastify, { FastifyRequest ,FastifyReply, FastifyInstance } from "fastify";
import cors from '@fastify/cors';

import bcrypt from 'bcryptjs';

import { PrismaClient } from "@prisma/client";

import { LoginRequest, RegisterRequest, TransactionRequest } from "./@types";
import fastifyJwt from "@fastify/jwt";

const prisma = new PrismaClient();

async function buildServer() {
    const app: FastifyInstance = Fastify({logger: true});
    
    await app.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        credentials: true
    });


    
    
    // JWT
    await app.register(fastifyJwt, {secret: process.env.JWT_SECRET || 'secret'})
    
    app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err)
        }
    })

    
    // Rotas
    app.post('/register', async (request: FastifyRequest<RegisterRequest>, reply: FastifyReply) => {
        try {
            const { username, password, confirmPassword } = request.body;

            const existingUser = await prisma.user.findUnique({where: {username}})

            if (existingUser) {
                return reply.status(404).send({
                    error: 'User already exists'
                })
            }

            if (password || typeof password !== 'string') {
                return reply.status(400).send({
                    error: 'Password must be a string'
                })
            }

            if (password !== confirmPassword) {
                    throw new Error('Passwords do not match'); 
                }
            

            const PasswordHash = await bcrypt.hash(password.toString(), 10);

            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: PasswordHash
                }
            })

            return reply.send({
                message: 'User created successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    password: user.password
                }
            })

        }  catch (error) {
            return reply.status(500).send({
                error: 'Error creating user'
            })
        }
    })

    app.post<LoginRequest>('/login', async (request: FastifyRequest<LoginRequest>, reply: FastifyReply) => {
        try {
            const { username, password } = request.body

            const user = await prisma.user.findUnique({where: {username}})
            if (!user) {
                return reply.status(404).send({
                    error: 'User not found'
                })
            }

            const isPasswordValid = await bcrypt.compare(password.toString(), user.password)
            if (!isPasswordValid) {
                return reply.status(401).send({
                    error: 'Invalid password'
                })
            }

        }
    })

    app.post<TransactionRequest>('/', async (request: FastifyRequest<TransactionRequest>, reply: FastifyReply) => {
       try {
        const { id, description, type, category, price } = request.body

        const transaction = await prisma.transaction.create({
            data: {
                id,
                description,
                type,
                category,
                price,
                createdAt: new Date()
            }
        })

        console.log('Transaction created successfully:', transaction)
        return reply.status(201).send(transaction)

       } catch (error) {
            return reply.status(500).send({
                error: 'Error creating transaction'
            })
       }

    });

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const transactions = await prisma.transaction.findMany()
            return reply.status(200).send(transactions)
            
        } catch (error) {
            return reply.status(500).send({
                error: 'Error getting transactions'
            })
        }
    })

    return app
}

async function start() {
    try {
        const server = await buildServer();
        await server.listen({ port: 3333 });
        console.log('Server started on port 3333');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start()