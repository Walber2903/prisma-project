import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Create 5 users
    const users = await prisma.user.createMany({
      data: [
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' },
        { name: 'User 4', email: 'user4@example.com' },
        { name: 'User 5', email: 'user5@example.com' },
      ],
    });

    console.log(`Created ${users.count} users`);

    // Create 20 posts, distribute beetween the 5 users
    const posts: Omit<Post, 'id' | 'createdAt'>[] = []; 
    for (let i = 1; i <= 20; i++) {
      posts.push({
        title: `Post Title ${i}`,
        content: `Content of post ${i}`,
        authorId: ((i - 1) % 5) + 1, 
      });
    }

    await prisma.post.createMany({ data: posts });

    console.log('Created 20 posts');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
