import Fastify, { FastifyRequest ,FastifyReply, FastifyInstance } from "fastify";
import cors from '@fastify/cors';

import { PrismaClient } from "@prisma/client";

import { TransactionRequest } from "./@types";

const prisma = new PrismaClient();

async function buildServer() {
    const app: FastifyInstance = Fastify({logger: true});
    
    await app.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    });

    // Rotas

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
        console.log('Transaction created successfully:', transaction)

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
            console.log('Transactions fetched successfully:', transactions)
            
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