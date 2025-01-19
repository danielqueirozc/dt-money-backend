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
     confirmPassword: string
     username: string;
      password: string;
   }
}