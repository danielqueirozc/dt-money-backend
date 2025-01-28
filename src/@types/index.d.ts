export interface TransactionRequest {
   Body: {
      id: string;
      description: string;
      type: import('@prisma/client').TransactionType;
      category: string;
      price: number;
      createdAt: Date;
   }
}

export interface LoginRequest {
   Body: {
      username: string;
      password: string;
   }
}


export interface RegisterRequest {
   Body: {
     ConfirmPassword: string
     username: string;
      password: string;
   }
}

export declare module 'fastify' {
   interface FastifyInstance {
       authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
   }
}