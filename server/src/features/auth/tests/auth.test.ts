import supertest from 'supertest';
import { TSignUpSchema } from '@shared/types';
import { prisma, redisClient } from '@/utils';
import { app } from '@/app';

const fakeApi = supertest(app);

const newUser: TSignUpSchema = {
  name: 'Test User Lion',
  email: 'test@email.com',
  password: 'testpassword',
  confirmPassword: 'testpassword',
};

afterAll(async () => {
  await prisma.$disconnect();
  await redisClient.quit();
});

describe('User API', () => {
  beforeEach(async () => {
    await prisma.meal.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should create a new user', async () => {
    const response = await fakeApi.post('/api/users').send(newUser).expect(201);

    const [user] = await prisma.user.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { email: response.body.email },
      take: 1,
    });

    expect(user.email).toBe(response.body.email);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('role');
  });
  it('should not create a new user if the email is already taken', async () => {
    await fakeApi.post('/api/users').send(newUser).expect(201);
    const response = await fakeApi
      .post('/api/users')
      .set('cookie', 'connect.sid=some-session-id')
      .send(newUser);
    expect(response.status).toBe(400);
  });
  it('should not create a new user if the password is too short', async () => {
    await fakeApi
      .post('/api/users')
      .send({ ...newUser, password: '123' })
      .expect(400);
  });
  it('should not create a new user if the password and confirmPassword do not match', async () => {
    await fakeApi
      .post('/api/users')
      .send({ ...newUser, confirmPassword: '123456' })
      .expect(400);
  });
  it('should not create a new user if the email is invalid', async () => {
    await fakeApi
      .post('/api/users')
      .send({ ...newUser, email: 'invalidemail' })
      .expect(400);
  });
});
