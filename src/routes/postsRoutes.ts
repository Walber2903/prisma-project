import { FastifyInstance } from 'fastify';

export default async function postRoutes(fastify: FastifyInstance) {
  // Get all posts
  fastify.get('/posts', async (request, reply) => {
    return fastify.prisma.post.findMany({
      include: { author: true },
    });
  });

  // Get post by ID
  fastify.get('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return fastify.prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });
  });

  // Create post
  fastify.post('/posts', async (request, reply) => {
    const { title, content, authorId } = request.body as {
      title: string;
      content: string;
      authorId: number;
    };
    return fastify.prisma.post.create({
      data: { title, content, authorId },
    });
  });

  // Update post
  fastify.put('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, content } = request.body as { title: string; content: string };
    return fastify.prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
  });

  // Delete post
  fastify.delete('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return fastify.prisma.post.delete({ where: { id: parseInt(id) } });
  });

  //Update multiple posts
  fastify.put('/posts/update-many', async (request, reply) => {
    // Request body expects authorId and the new title for all posts
    const { authorId, newTitle } = request.body as {
      authorId: number;
      newTitle: string;
    };  
    // Update all posts that belong to the given author
    const updatedPosts = await fastify.prisma.post.updateMany({
      where: { authorId },
      data: { title: newTitle },
    });  
    // Return the number of updated posts
    return updatedPosts;
  });

  // Delete a post by author
  fastify.delete('/posts/delete-by-author', async (request, reply) => {
    // Request body expects an authorId
    const { authorId } = request.body as { authorId: number };
    // Delete all posts belonging to the given author
    const deletedPosts = await fastify.prisma.post.deleteMany({
      where: { authorId },
    });
    // Return the number of deleted posts
    return deletedPosts;
  });

  // Search by author and date range
  fastify.get('/posts/by-author-date', async (request, reply) => {
    // Query params expect authorId, startDate, and endDate
    const { authorId, startDate, endDate } = request.query as {
      authorId: number;
      startDate: string;
      endDate: string;
    };
    // Fetch posts for the given author and date range
    const posts = await fastify.prisma.post.findMany({
      where: {
        authorId,
        // createdAt: {
        //   gte: new Date(startDate),
        //   lte: new Date(endDate),
        // },
      },
    });
    return posts;
  });
  
}
