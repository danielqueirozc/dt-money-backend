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