import { FastifyInstance } from 'fastify';

export default async function userRoutes(fastify: FastifyInstance) {
  // Get all users
  fastify.get('/users', async (request, reply) => {
    return fastify.prisma.user.findMany();
  });

  // Get user by ID
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return fastify.prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { posts: true },
    });
  });

  // Create user
  fastify.post('/users', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };
    return fastify.prisma.user.create({
      data: { name, email },
    });
  });

  // Update user
  fastify.put('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string; email: string };
    return fastify.prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
  });

  // Delete user
  fastify.delete('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return fastify.prisma.user.delete({ where: { id: parseInt(id) } });
  });
}
