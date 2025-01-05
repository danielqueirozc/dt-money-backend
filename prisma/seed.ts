import {  PrismaClient } from '@prisma/client'

interface Transaction {
  id?: string;
  description: string;
  type: import('@prisma/client').TransactionType;
  category: string;
  price: number;
  createdAt?: Date;
}

const prisma = new PrismaClient()

async function main() {
    const transactios: Transaction[] = [
        {
          "description": "Desenvolvimento de site",
          "type": "income",
          "category": "Venda",
          "price": 14000,
        },
        {
          "description": "Hamburguer",
          "type": "outcome",
          "category": "Alimentação",
          "price": 50,
        },
        {
          "description": "Ignite Rocketseat",
          "type": "outcome",
          "category": "Educação",
          "price": 1980,
        },
        {
          "description": "Desenvolvimento de site",
          "category": "Venda",
          "price": 5500,
          "type": "income",
        },
        {
          "description": "pastel",
          "category": "alimentação",
          "price": 5,
          "type": "outcome",
        },
        {
          "description": "lanche",
          "category": "alimentação",
          "price": 40,
          "type": "outcome",
        }
      ]

      for (const transaction of transactios) {
        await prisma.transaction.create({
          data: transaction
        })
      }

      console.log('Transactions created successfully!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
