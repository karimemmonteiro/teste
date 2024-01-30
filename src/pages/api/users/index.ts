// // pages/api/users.ts
// import { PrismaClient } from '../../../../prisma/generated/client';

// export default async function handler(req, res) {
//   const prisma = new PrismaClient();

//   if (req.method === 'GET') {
//     const users = await prisma.user.findMany();
//     res.status(200).json({ users });
//   } else if (req.method === 'POST') {
//     const { name, email } = req.body;
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//     });
//     res.status(201).json(newUser);
//   } else {
//     res.status(405).end(); // Método não permitido
//   }

//   prisma.$disconnect();
// }
