import Fastify from 'fastify';
import prismaPlugin from './services/prisma';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postsRoutes';

const server = Fastify();

server.register(prismaPlugin);
server.register(userRoutes);
server.register(postRoutes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
